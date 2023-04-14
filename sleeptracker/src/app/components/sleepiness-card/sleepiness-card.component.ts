import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { StanfordSleepinessData } from 'src/app/data/stanford-sleepiness-data';
import { SleepService } from 'src/app/services/sleep.service';
import { Share } from '@capacitor/share'
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-sleepiness-card',
  templateUrl: './sleepiness-card.component.html',
  styleUrls: ['./sleepiness-card.component.scss'],
})
export class SleepinessCardComponent implements OnInit {
  @Input() private data: StanfordSleepinessData;

  constructor(private sleepService: SleepService, private alertCtrl: AlertController, private actionSheetCtrl: ActionSheetController, private navCtrl: NavController) { }

  ngOnInit() {
  }

  get summary() {
    return this.data.summaryString();
  }
  
  get dateString() {
    const date = new Date(this.data.loggedAt)
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: "2-digit", minute: "2-digit" });
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
                loggedValue: this.data.value,
                loggedAt: this.data.loggedAt
              }
            };

            this.navCtrl.navigateForward(['edit-sleepiness'], navigationExtras);
          }
        },
        {
          text: "Share",
          role: 'share',
          handler: async () => {
            await Share.share({
              title: "Check out my Stanford Sleepiness Scale Log!",
              text: `I logged feeling a ${this.data.value} on ${this.dateString}. This means I felt: ${StanfordSleepinessData.ScaleValues[this.data.value]}`
            })
          }
        }
      ]
    })

    await sheet.present();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: "CAUTION",
      subHeader: `Are you sure you want to remove your sleepiness log for ${this.dateString}`,
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
