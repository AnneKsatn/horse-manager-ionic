import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddHorsePageRoutingModule } from './add-horse-routing.module';

import { AddHorsePage } from './add-horse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddHorsePageRoutingModule
  ],
  declarations: [AddHorsePage]
})
export class AddHorsePageModule {}
