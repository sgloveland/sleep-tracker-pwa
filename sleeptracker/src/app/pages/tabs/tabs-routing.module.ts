import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import("../home/home.module").then((m) => m.HomePageModule),
      },
      {
        path: 'search',
        loadChildren: () => import("../search/search.module").then((m) => m.SearchPageModule)
      },
      {
        path: 'history',
        loadChildren: () => import("../history/history.module").then((m) => m.HistoryPageModule)
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
