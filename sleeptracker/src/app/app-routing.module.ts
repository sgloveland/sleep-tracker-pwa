import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./pages/tabs/tabs.module").then((m) => m.TabsPageModule)
  },
  {
    path: 'logOvernight',
    loadChildren: () => import("./pages/log-overnight/log-overnight.module").then((m) => m.LogOvernightPageModule)
  },
  {
    path: 'logSleepiness',
    loadChildren: () => import("./pages/log-sleepiness/log-sleepiness.module").then((m) => m.LogSleepinessPageModule)
  },
  {
    path: 'edit-overnight',
    loadChildren: () => import('./pages/edit-overnight/edit-overnight.module').then( m => m.EditOvernightPageModule)
  },
  {
    path: 'edit-sleepiness',
    loadChildren: () => import('./pages/edit-sleepiness/edit-sleepiness.module').then( m => m.EditSleepinessPageModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
