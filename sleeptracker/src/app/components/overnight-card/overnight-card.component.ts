import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';
import { SleepService } from 'src/app/services/sleep.service';
import { Share } from '@capacitor/share'
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-overnight-card',
  templateUrl: './overnight-card.component.html',
  styleUrls: ['./overnight-card.component.scss'],
})
export class OvernightCardComponent implements OnInit {
  @Input() private data: OvernightSleepData;

  constructor(private actionSheetCtrl: ActionSheetController, private sleepService: SleepService, private alertController: AlertController, private navCtrl: NavController) { }

  ngOnInit() {}

  get date() {
    return this.data.dateString();
  }

  get summary() {
    return this.data.summaryString();
  }

  async presentActionSheet() {
    const sheet = await this.actionSheetCtrl.create({
      header: "Log Options",
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
        },
        {
          text: "Delete",
          role: 'destructive',
          handler: async () => {
            await this.presentAlert();
          }
        },
        {
          text: "Edit",
          role: 'edit',
          handler: () => {
            const navigationExtras: NavigationExtras = {
              queryParams: {
                id: this.data.id,
                startDate: this.data.startDate,
                endDate: this.data.endDate,
              }
            };

            this.navCtrl.navigateForward(['edit-overnight'], navigationExtras);
          }
        },
        {
          text: "Share",
          role: 'share',
          handler: async () => {
            await Share.share({
              title: "Check out my Overnight Sleep Log!",
              text: `I slept for ${this.summary} on the ${this.date}!`
            })
          }
        }
      ]
    })

    await sheet.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "CAUTION",
      subHeader: `Are you sure you want to remove your overnight sleep log for ${this.date}`,
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
            await this.sleepService.removeFromStorage(this.data.id);
          }
        }
      ]
    })

    await alert.present();
  }
}
