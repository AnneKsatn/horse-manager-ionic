import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomVetPageRoutingModule } from './custom-vet-routing.module';

import { CustomVetPage } from './custom-vet.page';
import { CustomProcedureCardComponent } from '../custom-vet/procedure-card/procedure-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomVetPageRoutingModule
  ],
  declarations: [CustomVetPage, CustomProcedureCardComponent]
})
export class CustomVetPageModule {}
