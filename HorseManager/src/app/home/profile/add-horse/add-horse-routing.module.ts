import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddHorsePage } from './add-horse.page';

const routes: Routes = [
  {
    path: '',
    component: AddHorsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddHorsePageRoutingModule {}
