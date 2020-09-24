import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManegePage } from './manege.page';

const routes: Routes = [
  {
    path: '',
    component: ManegePage
  },  {
    path: 'create-event',
    loadChildren: () => import('./create-event/create-event.module').then( m => m.CreateEventPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManegePageRoutingModule {}
