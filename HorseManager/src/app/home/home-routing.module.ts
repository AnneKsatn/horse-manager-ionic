import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
  },
  {
    path: 'vet',
    loadChildren: () => import('./veterenary/veterenary.module').then( m => m.VeterenaryPageModule)
  },
  {
    path: 'manege',
    loadChildren: () => import('./manege/manege.module').then( m => m.ManegePageModule)
  },
  {
    path: 'custom-vet',
    loadChildren: () => import('./custom-vet/custom-vet.module').then( m => m.CustomVetPageModule)
  }, 
  {
    path: 'create-vet',
    loadChildren: () => import('./custom-vet/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'edit-vet',
    loadChildren: () => import('./custom-vet/edit/edit.module').then( m => m.EditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
