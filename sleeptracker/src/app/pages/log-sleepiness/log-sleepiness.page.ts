import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { StanfordSleepinessData } from 'src/app/data/stanford-sleepiness-data';
import { SleepService } from 'src/app/services/sleep.service';

@Component({
  selector: 'app-log-sleepiness',
  templateUrl: './log-sleepiness.page.html',
  styleUrls: ['./log-sleepiness.page.scss'],
})
export class LogSleepinessPage implements OnInit {
  private ScaleValues = [
	'Feeling active, vital, alert, or wide awake',
	'Functioning at high levels, but not at peak; able to concentrate',
	'Awake, but relaxed; responsive but not fully alert',
	'Somewhat foggy, let down',
	'Foggy; losing interest in remaining awake; slowed down',
	'Sleepy, woozy, fighting sleep; prefer to lie down',
	'No longer fighting sleep, sleep onset soon; having dream-like thoughts'];
  private selectedValue: number;
  private hidePicker: boolean = true;
  private today: string;
  private loggedAt: Date = new Date();

  constructor(private alertController: AlertController, private navController: NavController, private sleepService: SleepService) { }

  ngOnInit() {
    //extremely hacky way to do this, but will suffice for this project
    //Essentially, the localized time is 8 hours earlier than to ISO time
    //if it's 3:00 PM here, new Date().toISOString() will show the time as 11:00 PM
    this.today = new Date(new Date().getTime() - (8*60*60*1000)).toISOString();
  }

  get ISOString() {
    return new Date(this.loggedAt.getTime() - (8*60*60*1000)).toISOString();
  }

  handleRadioChange(ev: any) {
    this.selectedValue = ev.detail.value;
  }

  handleDateClick() {
    this.hidePicker = false
  }
  
  handleDateCancel() {
    this.hidePicker = true;
  }

  handleDateChange(ev: any) {
    this.loggedAt = new Date(ev.detail.value);
    this.hidePicker = true;
  }

  async presentAlert() {
    //const today = (this.loggedAt === new Date) new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    const alert = this.selectedValue ? (await this.alertController.create({
      header: "Please Confirm",
      message: `On ${this.loggedAt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}, you are \"${this.ScaleValues[this.selectedValue - 1]}\"`,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
          cssClass: 'alert-button-cancel'
        },
        {
          text: "Confirm",
          role: "confirm",
          cssClass: 'alert-button-confirm',
          handler: () => {
            const sleepinessData: StanfordSleepinessData = new StanfordSleepinessData(this.selectedValue, this.loggedAt);
            this.sleepService.logSleepinessData(sleepinessData);
            this.navController.pop();
          }
        }
      ]
    })) : (
      await this.alertController.create({
        header: "Error",
        message: "You must choose one of the options in order to log your sleepiness.",
        buttons:[
          {
            text: "Okay",
            role: "okay"
          }
        ]
      })
    );

    await alert.present();
  }
}
