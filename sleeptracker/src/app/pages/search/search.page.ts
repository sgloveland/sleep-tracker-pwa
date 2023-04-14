import { Component, OnInit } from '@angular/core';
import { SleepService } from 'src/app/services/sleep.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  private MAX_DATE: string;
  private selectedDay: Date = new Date();
  private hidePicker: boolean = true;

  private overnightData = [];
  private sleepinessData = [];

  constructor() { }

  ngOnInit() {
    //extremely hacky way to do this, but will suffice for this project
    //Essentially, the localized time is 8 hours earlier than to ISO time
    //if it's 3:00 PM here, new Date().toISOString() will show the time as 11:00 PM
    this.MAX_DATE = new Date(new Date().getTime() - (8*60*60*1000)).toISOString();
    this.search();
  }

  get ISOString() {
    return new Date(this.selectedDay.getTime() - (8*60*60*1000)).toISOString();
  }

  handlePickerClick() {
    this.hidePicker = false;
  }

  handleDateCancel() {
    this.hidePicker = true;
  }

  handleDateChange(e: any) {
    this.selectedDay = new Date(e.detail.value)
    this.hidePicker = true;
    this.search();
  }

  search() {
    this.overnightData = SleepService.AllOvernightData.filter((item: any) => {
      return (this.selectedDay.getFullYear() === item.sleepStart.getFullYear() &&
        this.selectedDay.getMonth() === item.sleepStart.getMonth() &&
        this.selectedDay.getDate() === item.sleepStart.getDate()
      )
      
    })

    this.sleepinessData = SleepService.AllSleepinessData.filter((item: any) => {
      return (this.selectedDay.getFullYear() === item.loggedAt.getFullYear() &&
        this.selectedDay.getMonth() === item.loggedAt.getMonth() &&
        this.selectedDay.getDate() === item.loggedAt.getDate()
      )
    })
  }
}
