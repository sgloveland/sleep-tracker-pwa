import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import { OvernightCardComponent } from 'src/app/components/overnight-card/overnight-card.component';
import { SleepinessCardComponent } from 'src/app/components/sleepiness-card/sleepiness-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule
  ],
  declarations: [HistoryPage, OvernightCardComponent, SleepinessCardComponent]
})
export class HistoryPageModule {}
