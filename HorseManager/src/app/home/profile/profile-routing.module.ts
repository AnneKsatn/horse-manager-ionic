import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'care',
    loadChildren: () => import('./care-page/care-page.module').then( m => m.CarePagePageModule)
  },  {
    path: 'add-horse',
    loadChildren: () => import('./add-horse/add-horse.module').then( m => m.AddHorsePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
