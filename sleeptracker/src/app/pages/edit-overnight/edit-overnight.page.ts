import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';
import { SleepService } from 'src/app/services/sleep.service';


@Component({
  selector: 'app-edit-overnight',
  templateUrl: './edit-overnight.page.html',
  styleUrls: ['./edit-overnight.page.scss'],
})
export class EditOvernightPage implements OnInit {
  private MAX_DATE: string;
  private id: string;

  private startDate: Date;
  private endDate: Date;

  private hideStartPicker: boolean = true;
  private hideEndPicker: boolean = true;

  constructor(private route: ActivatedRoute, private alertController: AlertController, private navController: NavController, private sleepService: SleepService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params["id"];
      this.startDate = new Date(params["startDate"]);
      this.endDate = new Date(params["endDate"]);
    });
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
    const alert = await this.alertController.create({
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
            this.sleepService.updateOvernightData(this.id, this.startDate, this.endDate);
            this.navController.pop();
          }
        }
      ]
    })

    await alert.present();
  }

}
