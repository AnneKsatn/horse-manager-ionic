import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomVetPage } from './custom-vet.page';

const routes: Routes = [
  {
    path: '',
    component: CustomVetPage
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomVetPageRoutingModule {}
