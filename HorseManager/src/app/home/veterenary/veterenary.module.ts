import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VeterenaryPageRoutingModule } from './veterenary-routing.module';

import { VeterenaryPage } from './veterenary.page';
import { OrderByPipe } from '../../shared/pipes/order-by.pipe';
import { ProcedureCardComponent } from './procedure-card/procedure-card.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VeterenaryPageRoutingModule
  ],
  declarations: [
    VeterenaryPage,  
    OrderByPipe,
    ProcedureCardComponent
    ]
})
export class VeterenaryPageModule {}
