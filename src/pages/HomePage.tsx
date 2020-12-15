import React, {useEffect, useState} from 'react';
import {IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToast, IonToolbar} from '@ionic/react';
import './HomePage.css';
import Activity from '../model/Activity';
import {get} from '../api/ActivityApiService';
import ActivityList from '../components/activity/ActivityList';
import {APP_NAME} from '../App';
import {chevronDownCircleOutline} from 'ionicons/icons';
import {RefresherEventDetail} from '@ionic/core';

export default function HomePage() {

    const [activities, setActivities] = useState<Activity[]>([]);
    const [toastError, setToastError] = useState(false);
    const [toastSuccess, setToastSuccess] = useState(false);

    async function callGetActivities() {
        get('test')
            .then(r => {
                const mappedActivities = r.map((a: any) => {
                    return new Activity(a.id, a.name, a.createdBy, a.expenses, a.activityStatus, a.userStatus);
                });
                setActivities(mappedActivities);
            })
            .then(() => setToastSuccess(true))
            .catch(() => setToastError(true));
    }

    useEffect(() => {
        callGetActivities();
    }, []);

    function getErrorToast(message: string) {
        return <IonToast
            isOpen={toastError}
            onDidDismiss={() => setToastError(false)}
            message={message}
            duration={2000}/>;
    }

    function getSuccessToast(message: string) {
        return <IonToast
            isOpen={toastSuccess}
            onDidDismiss={() => setToastSuccess(false)}
            message={message}
            duration={500}/>;
    }

    function refreshActivities(event: CustomEvent<RefresherEventDetail>) {
        setActivities([]);
        callGetActivities()
            .then(() => event.detail.complete());
    }

    function getRefresher() {
        return <IonRefresher slot="fixed" onIonRefresh={refreshActivities}>
            <IonRefresherContent
                pullingIcon={chevronDownCircleOutline}
                pullingText="Pull to refresh"
                refreshingSpinner="circular"
                refreshingText="Refreshing...">
            </IonRefresherContent>
        </IonRefresher>;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{APP_NAME}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <ActivityList activities={activities}/>
                {getRefresher()}
            </IonContent>

            {getSuccessToast('Successfully found activities')}
            {getErrorToast('An error occurred while retrieving activities. Please try again later.')}

        </IonPage>
    );
};
