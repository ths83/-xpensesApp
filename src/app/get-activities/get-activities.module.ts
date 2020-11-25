import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetActivitiesPageRoutingModule } from './get-activities-routing.module';

import { GetActivitiesPage } from './get-activities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetActivitiesPageRoutingModule
  ],
  declarations: [GetActivitiesPage]
})
export class GetActivitiesPageModule {}
