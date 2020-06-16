import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorseProfilePageRoutingModule } from './horse-profile-routing.module';

import { HorseProfilePage } from './horse-profile.page';
import { StableRegistrationComponent } from './stable-registration/stable-registration.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorseProfilePageRoutingModule
  ],
  declarations: [HorseProfilePage,  StableRegistrationComponent]
})
export class HorseProfilePageModule {}


