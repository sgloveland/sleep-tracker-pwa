import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSleepinessPage } from './edit-sleepiness.page';

const routes: Routes = [
  {
    path: '',
    component: EditSleepinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSleepinessPageRoutingModule {}
