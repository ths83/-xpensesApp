import React, {useEffect, useState} from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToast, IonToolbar} from '@ionic/react';
import './HomePage.css';
import Activity from '../model/Activity';
import {get} from '../api/ActivityApiService';
import ActivityList from '../components/activity/ActivityList';

const HomePage: React.FC = () => {

    const [activities, setActivities] = useState<Activity[]>([]);
    const [toastError, setToastError] = useState(false);

    useEffect(() => {
        async function callGetActivities() {
            get('test')
                .then(r => {
                    const mappedActivities = r.map((a: any) => {
                        return new Activity(a.id, a.name, a.createdBy, a.expenses, a.activityStatus, a.userStatus);
                    });
                    setActivities(mappedActivities);
                })
                .catch(() => setToastError(true));
        }

        callGetActivities();
    }, []);

    function getErrorToast(message: string) {
        return <IonToast
            isOpen={toastError}
            onDidDismiss={() => setToastError(false)}
            message={message}
            duration={2000}/>;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>My activities</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <ActivityList activities={activities}/>
            </IonContent>
            {getErrorToast('An error occurred while retrieving activities. Please try again later.')}
        </IonPage>
    );
};

export default HomePage;
