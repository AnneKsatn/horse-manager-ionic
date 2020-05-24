import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditHorsePage } from './edit-horse.page';

const routes: Routes = [
  {
    path: '',
    component: EditHorsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditHorsePageRoutingModule {}
