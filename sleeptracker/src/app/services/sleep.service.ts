import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Storage } from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = true;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];

	constructor(private storage: Storage) {
		//this.init();
	}

	async init() {
		await this.storage.create();
		await this.loadDataFromStorage();
	}

	private addDefaultData() {
		this.logOvernightData(new OvernightSleepData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00')));
		this.logSleepinessData(new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00')));
		this.logOvernightData(new OvernightSleepData(new Date('February 20, 2021 23:11:00'), new Date('February 21, 2021 08:03:00')));
	}

	async logOvernightData(sleepData:OvernightSleepData) {
		//not sure why, but according to console logs, these two values must be flipped
		const key: string = sleepData.id;
		await this.storage.set(key, JSON.stringify(sleepData));
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
		this.sortLocalOvernightData();
	}

	async logSleepinessData(sleepData:StanfordSleepinessData) {
		const key: string = sleepData.id;
		await this.storage.set(key, JSON.stringify(sleepData))
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
		this.sortLocalSleepinessData();
	}
	
	async get(key: string) {
		return await this.storage.get(key);
	}

	async updateOvernightData(key: string, startDate: Date, endDate: Date) {
		this.storage.get(key).then(async (valueStr) => {
			let value = valueStr ? JSON.parse(valueStr) : {}

			value.sleepStart = startDate;
			value.sleepEnd = endDate;

			await this.storage.set(key, JSON.stringify(value));

			const indexToUpdate = SleepService.AllOvernightData.findIndex((item) => item.id === key);
			SleepService.AllOvernightData[indexToUpdate].setStartDate(startDate);
			SleepService.AllOvernightData[indexToUpdate].setEndDate(endDate);
		})
	}

	async updateSleepinessData(key: string, loggedValue: number, date: Date){
		this.storage.get(key).then(async (valueStr) => {
			let value = valueStr ? JSON.parse(valueStr) : {}

			value.loggedValue = loggedValue;
			value.loggedAt = date

			await this.storage.set(key, JSON.stringify(value));

			const indexToUpdate = SleepService.AllSleepinessData.findIndex((item) => item.id === key);
			SleepService.AllSleepinessData[indexToUpdate].setLoggedValue(loggedValue);
			SleepService.AllSleepinessData[indexToUpdate].loggedAt = date;
		})
	}

	async removeFromStorage(key:string) {
		await this.storage.remove(key);
		SleepService.AllSleepData = SleepService.AllSleepData.filter((item) => item.id != key)
		SleepService.AllSleepinessData = SleepService.AllSleepinessData.filter((item) => item.id != key);
		SleepService.AllOvernightData = SleepService.AllOvernightData.filter((item) => item.id != key)
	}

	async loadDataFromStorage() {
		const length = await this.storage.length();
		if(length && length > 0) {
			await this.storage.forEach((key, value) => {
				//parse the value so that we can turn it into an object from JSON string
				const sleepData = JSON.parse(key);
	
				if(sleepData.type === "overnight") {
					//we have to create new objects so that specific get methods work within components
					const pushData = new OvernightSleepData(new Date(sleepData.sleepStart), new Date(sleepData.sleepEnd), value)
					SleepService.AllOvernightData.push(pushData);
					SleepService.AllSleepData.push(pushData);
				} 
				else {
					const pushData = new StanfordSleepinessData(sleepData.loggedValue, new Date(sleepData.loggedAt), value)
					SleepService.AllSleepinessData.push(pushData);
					SleepService.AllSleepData.push(pushData);
				}
			})
			this.sortLocalOvernightData();
			this.sortLocalSleepinessData();
		} else {
			console.log("Initial Storage is empty . . . ")
		}
	}

	async clearStorage() {
		await this.storage.clear();
		SleepService.AllSleepData.splice(0, SleepService.AllSleepData.length)
		SleepService.AllSleepinessData.splice(0, SleepService.AllSleepinessData.length)
		SleepService.AllOvernightData.splice(0, SleepService.AllOvernightData.length)
	}

	private sortLocalOvernightData() {
		SleepService.AllOvernightData = SleepService.AllOvernightData.sort((item1, item2) => {
			return item2.endDate.getTime() - item1.endDate.getTime();
		})
	}

	private sortLocalSleepinessData() {
		SleepService.AllSleepinessData = SleepService.AllSleepinessData.sort((item1, item2) => {
			return item2.loggedAt.getTime() - item1.loggedAt.getTime();
		})
	}
}
