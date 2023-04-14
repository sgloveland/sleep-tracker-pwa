import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditOvernightPage } from './edit-overnight.page';

const routes: Routes = [
  {
    path: '',
    component: EditOvernightPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditOvernightPageRoutingModule {}
