import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditOvernightPageRoutingModule } from './edit-overnight-routing.module';

import { EditOvernightPage } from './edit-overnight.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditOvernightPageRoutingModule
  ],
  declarations: [EditOvernightPage]
})
export class EditOvernightPageModule {}
