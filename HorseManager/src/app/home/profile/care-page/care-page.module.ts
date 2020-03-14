import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarePagePageRoutingModule } from './care-page-routing.module';
import { FeedingComponent } from './feeding/feeding.component';
import { FeedingItemComponent } from './feeding-item/feeding-item.component';

import { CarePagePage } from './care-page.page';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    CarePagePageRoutingModule
  ],
  declarations: [CarePagePage, FeedingComponent, FeedingItemComponent]
})
export class CarePagePageModule {}
