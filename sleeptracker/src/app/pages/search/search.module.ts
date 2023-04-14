import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { OvernightCardComponent } from 'src/app/components/overnight-card/overnight-card.component';
import { SleepinessCardComponent } from 'src/app/components/sleepiness-card/sleepiness-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule
  ],
  declarations: [SearchPage, OvernightCardComponent, SleepinessCardComponent]
})
export class SearchPageModule {}
