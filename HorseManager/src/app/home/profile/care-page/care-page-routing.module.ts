import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarePagePage } from './care-page.page';

const routes: Routes = [
  {
    path: '',
    component: CarePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarePagePageRoutingModule {}
