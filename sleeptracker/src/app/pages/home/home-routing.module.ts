import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogOvernightPage } from '../log-overnight/log-overnight.page';
import { LogSleepinessPage } from '../log-sleepiness/log-sleepiness.page';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
