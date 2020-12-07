import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import {withAuthenticator} from '@aws-amplify/ui-react';

import Amplify from 'aws-amplify';
import Home from './pages/Home';
import CreateActivity from './pages/CreateActivity';
import {add, home} from 'ionicons/icons';

export const API_NAME = 'xpenses';

Amplify.configure({
    Auth: {
        region: 'ca-central-1',
        userPoolId: 'ca-central-1_HFwrLK3vL',
        userPoolWebClientId: '6s0jrkss0ir3se44sbq97v6cn2',
    },
    API: {
        endpoints: [
            {
                name: API_NAME,
                endpoint: 'https://v4pvmzb6y2.execute-api.ca-central-1.amazonaws.com/api'
            }
        ]
    }
});

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route path="/home" component={Home} exact={true}/>
                    <Route path="/createActivity" component={CreateActivity} exact={true}/>
                    <Route path="/" render={() => <Redirect to="/home"/>} exact={true}/>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="home" href="/home">
                        <IonIcon icon={home}/>
                    </IonTabButton>
                    <IonTabButton tab="createActivity" href="/createActivity">
                        <IonIcon icon={add}/>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
);

export default withAuthenticator(App);
