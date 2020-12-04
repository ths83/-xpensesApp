import React, {useEffect, useState} from 'react';
import {IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Tab1.css';
import {API_NAME} from '../App';
import {API} from 'aws-amplify';
import Activity from '../model/Activity';
import {ellipse} from 'ionicons/icons';


const Tab1: React.FC = () => {

    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        async function getUserActivities() {
            const apiName = API_NAME;
            const path = '/activities?username=test';
            const myInit = {
                headers: {},
            };
            await API.get(apiName, path, myInit)
                .then(r => {
                    const mappedActivities = r.map((a: any) => {
                        return new Activity(a.id, a.name, a.createdBy, a.expenses, a.activityStatus, a.userStatus);
                    });

                    setActivities(mappedActivities);
                });
        }

        getUserActivities();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>My activities</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {
                        activities.map(activity => {
                                return (
                                    <IonItem key={activity.id}>
                                        <IonLabel>
                                            {activity.name}
                                        </IonLabel>
                                        <IonIcon icon={ellipse} size="small" slot="end"/>
                                    </IonItem>
                                );
                            }
                        )
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
