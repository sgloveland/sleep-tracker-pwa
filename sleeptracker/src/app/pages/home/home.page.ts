import { Component } from '@angular/core';
import { SleepService } from '../../services/sleep.service';
import { isPlatform } from '@ionic/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	private user: string = "Sean";
	private today: string = new Date().toISOString();
	private isAndroid: boolean;
	private sleepinessData;
	private overnightData;

	constructor(public sleepService:SleepService, public navController: NavController) {
		this.startTime();
	}

	async ngOnInit() {
		this.isAndroid = isPlatform('android')
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	startTime() {
		var intervalVar = setInterval(function() {
			this.today = new Date().toISOString();
		}.bind(this), 500)
	}

	handleOvernightClick() {
		this.navController.navigateForward("logOvernight")
	}

	handleSleepinessClick() {
		this.navController.navigateForward("logSleepiness")
	}
}
