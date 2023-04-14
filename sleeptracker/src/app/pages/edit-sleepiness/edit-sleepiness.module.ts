import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSleepinessPageRoutingModule } from './edit-sleepiness-routing.module';

import { EditSleepinessPage } from './edit-sleepiness.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSleepinessPageRoutingModule
  ],
  declarations: [EditSleepinessPage]
})
export class EditSleepinessPageModule {}
