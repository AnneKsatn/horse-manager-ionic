import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditHorsePageRoutingModule } from './edit-horse-routing.module';

import { EditHorsePage } from './edit-horse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditHorsePageRoutingModule
  ],
  declarations: [EditHorsePage]
})
export class EditHorsePageModule {}
