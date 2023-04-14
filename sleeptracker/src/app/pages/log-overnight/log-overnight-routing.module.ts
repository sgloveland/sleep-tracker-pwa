import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogOvernightPage } from './log-overnight.page';

const routes: Routes = [
  {
    path: '',
    component: LogOvernightPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogOvernightPageRoutingModule {}
