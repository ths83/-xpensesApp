import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateActivityPage } from './create-activity.page';

const routes: Routes = [
  {
    path: '',
    component: CreateActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateActivityPageRoutingModule {}
