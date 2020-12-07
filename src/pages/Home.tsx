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
    IonToast,
    IonToolbar
} from '@ionic/react';
import './Home.css';
import Activity from '../model/Activity';
import {ellipse} from 'ionicons/icons';
import {getActivities} from '../service/ActivityService';


const EMPTY_ACTIVITY = new Activity('', '', '', [], '', []);

const Home: React.FC = () => {

    const [activities, setActivities] = useState<Activity[]>([]);
    const [activityDetails, setActivityDetails] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(EMPTY_ACTIVITY);
    const [addExpense, setAddExpense] = useState(false);
    const [toastSuccess, setToastSuccess] = useState(false);
    const [toastError, setToastError] = useState(false);

    useEffect(() => {
        async function callGetActivities() {
            getActivities('test') //TODO username will be selected from token
                .then(r => {
                    const mappedActivities = r.map((a: any) => {
                        return new Activity(a.id, a.name, a.createdBy, a.expenses, a.activityStatus, a.userStatus);
                    });
                    setActivities(mappedActivities);
                    setToastSuccess(true);
                })
                .catch(() => setToastError(true));
        }

        callGetActivities();
    }, []);

    function renderCreateExpense() {
        return (
            <IonModal isOpen={addExpense}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            Create Expense
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonButton onClick={() => {
                    setAddExpense(false);
                }}>
                    Close
                </IonButton>
            </IonModal>
        );
    }

    function renderActivityDetails() {
        return (
            <IonModal isOpen={activityDetails}>
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
                    <p>Number of participants : {selectedActivity.userStatus == undefined ? 0 : selectedActivity.userStatus.length}</p>
                </IonText>

                <IonButton onClick={() => setAddExpense(true)}>Add expense</IonButton>

                <IonButton onClick={() => {
                    setSelectedActivity(EMPTY_ACTIVITY);
                    setActivityDetails(false);
                }}>
                    Close
                </IonButton>
                {renderCreateExpense()}
            </IonModal>
        );
    }

    function renderActivities() {
        return (
            <IonList>
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
            </IonList>
        );
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>My activities</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {renderActivities()}
                {renderActivityDetails()}

                <IonToast
                    isOpen={toastSuccess}
                    onDidDismiss={() => setToastSuccess(false)}
                    message="Successfully retrieved activities"
                    duration={1000}/>

                <IonToast
                    isOpen={toastError}
                    onDidDismiss={() => setToastError(false)}
                    message="An error occurred while retrieving activities. Please try again later."
                    duration={2000}/>
            </IonContent>
        </IonPage>
    );
};

export default Home;
