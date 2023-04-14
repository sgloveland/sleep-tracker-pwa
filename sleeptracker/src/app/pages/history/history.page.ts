import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';
import { StanfordSleepinessData } from 'src/app/data/stanford-sleepiness-data';
import { SleepService } from '../../services/sleep.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  private overnightData: OvernightSleepData[];
  private sleepinessData: StanfordSleepinessData[];
  private mode:string = "overnight";


  constructor(private sleepService: SleepService, private alertController: AlertController) { }

  ngOnInit() {
    this.overnightData = this.allOvernightData;
    this.sleepinessData = this.allSleepinessData;
  }

  get allOvernightData() {
		return SleepService.AllOvernightData;
	}
  
  get allSleepinessData() {
    return SleepService.AllSleepinessData;
  }

  get isOvernight() {
    return this.mode === "overnight"
  }

  segmentChanged(ev: any) {
    this.mode = ev.detail.value;
  }

  async handleClearData() {
    const alert = await this.alertController.create({
      header: "CAUTION",
      subHeader: "You are about to clear all sleep logs. Are you sure you would like to proceed?",
      message: "This action cannot be undone.",
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-button-cancel'
        },
        {
          text: "Confirm",
          role: 'confirm',
          cssClass: 'alert-button-confirm',
          handler: async () => {
            await this.sleepService.clearStorage();
          }
        }
      ]
    })

    await alert.present();
  }
}
