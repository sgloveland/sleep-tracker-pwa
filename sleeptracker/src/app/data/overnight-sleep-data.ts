import { SleepData } from './sleep-data';
import {generate} from 'shortid'

export class OvernightSleepData extends SleepData {
	private sleepStart:Date;
	private sleepEnd:Date;

	constructor(sleepStart:Date, sleepEnd:Date, id: string = generate()) {
		super("overnight", id);
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
	}

	get endDate() {
		return this.sleepEnd;
	}
	
	get startDate() {
		return this.sleepStart;
	}

	public setStartDate(date: Date) {
		this.sleepStart = date;
	}

	public setEndDate(date: Date) {
		this.sleepEnd = date;
	}

	get duration():number {
		return this.sleepEnd.getTime() - this.sleepStart.getTime()
	}

	summaryString():string {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		    
		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes";
	}

	dateString():string {
		return "Night of " + this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}
}
