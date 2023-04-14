import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogOvernightPageRoutingModule } from './log-overnight-routing.module';

import { LogOvernightPage } from './log-overnight.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogOvernightPageRoutingModule
  ],
  declarations: [LogOvernightPage]
})
export class LogOvernightPageModule {}
