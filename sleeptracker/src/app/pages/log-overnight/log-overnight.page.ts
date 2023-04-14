import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';
import { SleepService } from 'src/app/services/sleep.service';

@Component({
  selector: 'app-log-overnight',
  templateUrl: './log-overnight.page.html',
  styleUrls: ['./log-overnight.page.scss'],
})
export class LogOvernightPage implements OnInit {
  //you can't log future sleep
  private MAX_DATE: string;

  
  private startDate: Date = new Date();
  private endDate: Date = new Date();

  //these two booleans control when the datetimepickers are shown 
  //Hopefully will make the UI a little less cluttered
  private hideStartPicker: boolean = true;
  private hideEndPicker: boolean = true;

  constructor(private alertController: AlertController, private sleepService: SleepService, private navController: NavController) { }

  ngOnInit() {
    //extremely hacky way to do this, but will suffice for this project
    //Essentially, the localized time is 8 hours earlier than to ISO time
    //if it's 3:00 PM here, new Date().toISOString() will show the time as 11:00 PM
    this.MAX_DATE = new Date(new Date().getTime() - (8*60*60*1000)).toISOString();
  }
  
  handleStartClick() {
    this.hideStartPicker = false;
  }

  handleEndClick() {
    this.hideEndPicker = false;
  }

  handleStartChange(ev: any) {
    this.startDate = new Date(ev.detail.value);
    this.hideStartPicker = true;
  }

  handleStartCancel() {
    this.hideStartPicker = true;
  }

  handleEndChange(ev: any) {
    this.endDate = new Date(ev.detail.value);
    this.hideEndPicker = true;
  }

  handleEndCancel() {
    this.hideEndPicker = true;
  }

  get startISOString() {
    return new Date(this.startDate.getTime() - (8*60*60*1000)).toISOString();
  }

  get endISOString() {
    return new Date(this.endDate.getTime() - (8*60*60*1000)).toISOString();
  }

  async presentAlert() {
    //if endDate-startDate < 0, then endDate is smaller (earlier) than the start date, so it is invalid
    const alert = (this.endDate.getTime() - this.startDate.getTime() <= 0) ? (await this.alertController.create({
      header: "Error",
      message: "Your start date needs to come BEFORE the end date for a valid log entry. Please edit appropriately.",
      buttons: [
        {
          text: "Okay",
          role: "okay"
        }
      ]
    })) : (await this.alertController.create({
      header: "Please Confirm",
      message: `You slept from ${this.startDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'})} to ${this.endDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'})}`,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: 'alert-button-cancel'
        },
        {
          text: "Confirm",
          role: 'confirm',
          cssClass: 'alert-button-confirm',
          handler: () => {
            const overnightData = new OvernightSleepData(this.startDate, this.endDate);
            this.sleepService.logOvernightData(overnightData)
            this.navController.pop();
          }
        }
      ]
    }))

    await alert.present();
  }
}
