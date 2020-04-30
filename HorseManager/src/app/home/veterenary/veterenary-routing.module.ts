import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VeterenaryPage } from './veterenary.page';

const routes: Routes = [
  {
    path: '',
    component: VeterenaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeterenaryPageRoutingModule {}
