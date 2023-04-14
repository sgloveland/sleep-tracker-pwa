import { Component, OnInit } from '@angular/core';
import { SleepService } from 'src/app/services/sleep.service';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent implements OnInit {
  //average duration for past 7 entries of overnight logs
  private averageDuration: string;
  private longestOvernightDuration: string;
  private longestOvernightStart: Date;
  private longestOvernightEnd: Date;

  private highestSleepinessLog: number;
  private lowestSleepinessLog: number;
  private highestSleepinessDate: Date;
  private lowestSleepinessDate: Date;

  private notEnoughOvernightData: boolean = true;
  private notEnoughSleepinessData: boolean = true;

  constructor(private sleepService: SleepService) { }

  async ngOnInit() {
    //need to initialize the sleepService
    await this.sleepService.init();
    if(SleepService.AllOvernightData.length >= 7) {
      this.notEnoughOvernightData = false;
      this.calculateAverageDuration();
    }
    if(SleepService.AllSleepinessData.length >= 10) {
      this.notEnoughSleepinessData = false;
      this.calculateHighsAndLows();
    }
  }

  handleRefresh(event) {
    setTimeout(() => {
      if(SleepService.AllOvernightData.length >= 7) {
        this.notEnoughOvernightData = false;
        this.calculateAverageDuration();
      }else {
        this.notEnoughOvernightData = true
      }
      if(SleepService.AllSleepinessData.length >= 10) {
        this.notEnoughSleepinessData = false;
        this.calculateHighsAndLows();
      }else {
        this.notEnoughSleepinessData = true;
      }
      event.target.complete();
    }, 2000);
  };

  calculateAverageDuration() {
    var total = 0;
    var longestDuration = 0;
    var longestDurationStartDate, longestDurationEndDate;
      for(let i = 0; i < 7; ++i) {
        total += SleepService.AllOvernightData[i].duration;
        if(SleepService.AllOvernightData[i].duration > longestDuration) {
          longestDuration = SleepService.AllOvernightData[i].duration;
          longestDurationStartDate = SleepService.AllOvernightData[i].startDate;
          longestDurationEndDate = SleepService.AllOvernightData[i].endDate;
        }
      }
    this.longestOvernightStart = longestDurationStartDate;
    this.longestOvernightEnd = longestDurationEndDate;
    this.longestOvernightDuration = Math.floor(longestDuration / (1000*60*60)) + " hours, " + Math.floor(longestDuration / (1000*60) % 60) + " minutes";
    this.setAverageSleepDuration(total / 7);
  }

  setAverageSleepDuration(num_ms: number) {
    this.averageDuration = Math.floor(num_ms / (1000*60*60)) + " hours, " + Math.floor(num_ms / (1000*60) % 60) + " minutes";
  }

  calculateHighsAndLows() {
    var lowestValue = 8;
    var highestValue = 0;
    var lowestDate;
    var highestDate;
    for(let i = 0; i < 10; ++i) {
      if(SleepService.AllSleepinessData[i].value <= lowestValue) {
        lowestValue = SleepService.AllSleepinessData[i].value;
        lowestDate = SleepService.AllSleepinessData[i].loggedAt;
      }

      if(SleepService.AllSleepinessData[i].value >= highestValue) {
        highestValue = SleepService.AllSleepinessData[i].value;
        highestDate = SleepService.AllSleepinessData[i].loggedAt;
      }
    }
    this.lowestSleepinessLog = lowestValue;
    this.lowestSleepinessDate = new Date(lowestDate);
    this.highestSleepinessLog = highestValue;
    this.highestSleepinessDate = new Date(highestDate);

  }

}
