import React, {useEffect, useState} from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Tab1.css';
import {API_NAME} from '../App';
import {API, Auth} from 'aws-amplify';
import Activity from '../model/Activity';
import {ellipse} from 'ionicons/icons';


const EMPTY_ACTIVITY = new Activity('', '', '', [], '', []);

const Tab1: React.FC = () => {

    const [activities, setActivities] = useState<Activity[]>([]);
    const [activityDetails, setActivityDetails] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(EMPTY_ACTIVITY);

    useEffect(() => {
        async function getUserActivities() {
            const apiName = API_NAME;
            const path = '/activities?username=test';
            const myInit = {
                headers: {
                    'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
                },
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

    function getActivityDetailsModal() {
        return <IonModal isOpen={activityDetails}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        {selectedActivity.name}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonText color="primary">
                <h1>Activity id : {selectedActivity.id}</h1>
            </IonText>
            <IonText>
                <h3>Created by : {selectedActivity.createdBy}</h3>
                <br/>
                <p>Activity status : {selectedActivity.activityStatus}</p>
                <p>Number of expenses : {selectedActivity.expenses == undefined ? 0 : selectedActivity.expenses.length}</p>
                <p>Number of participants : {selectedActivity.userStatus == undefined ? 0 :selectedActivity.userStatus.length}</p>
            </IonText>
            <IonButton onClick={() => {
                setSelectedActivity(EMPTY_ACTIVITY);
                setActivityDetails(false);
            }}>Close Modal</IonButton>
        </IonModal>;
    }

    function getActivities() {
        return <>
            {
                activities.map(activity => {
                        return (
                            <IonItem key={activity.id} button onClick={() => {
                                setSelectedActivity(activity);
                                setActivityDetails(true);
                            }}>
                                <IonLabel>
                                    {activity.name}
                                </IonLabel>
                                <IonIcon icon={ellipse} size="small" slot="end"/>
                            </IonItem>
                        );
                    }
                )
            }
        </>;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>My activities</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {getActivities()}
                </IonList>
                {getActivityDetailsModal()}
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
