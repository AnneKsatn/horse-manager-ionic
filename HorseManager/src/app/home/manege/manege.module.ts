import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManegePageRoutingModule } from './manege-routing.module';

import { ManegePage } from './manege.page';
import {FullCalendarModule} from 'primeng/fullcalendar';
import { TimeTableComponent } from './time-table/time-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManegePageRoutingModule,
    FullCalendarModule
  ],
  declarations: [ManegePage, TimeTableComponent]
})
export class ManegePageModule {}
