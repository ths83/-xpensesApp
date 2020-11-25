import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateActivityPageRoutingModule } from './create-activity-routing.module';

import { CreateActivityPage } from './create-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateActivityPageRoutingModule
  ],
  declarations: [CreateActivityPage]
})
export class CreateActivityPageModule {}
