import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {AmplifyUIAngularModule} from '@aws-amplify/ui-angular';

import Amplify from 'aws-amplify';
import awsmobile from '../../aws-exports';

Amplify.configure(awsmobile);

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        AmplifyUIAngularModule
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
