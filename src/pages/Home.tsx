import React, {useEffect, useState} from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
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
import {get} from '../service/ActivityService';
import {create} from '../service/ExpenseService';

const Home: React.FC = () => {

    const EMPTY_ACTIVITY = new Activity('', '', '', [], '', []);

    const [activities, setActivities] = useState<Activity[]>([]);
    const [activityDetails, setActivityDetails] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<Activity>(EMPTY_ACTIVITY);
    const [addExpense, setAddExpense] = useState(false);
    const [toastSuccess, setToastSuccess] = useState(false);
    const [toastError, setToastError] = useState(false);
    const [amount, setAmount] = useState<number>(0);
    const [currency, setCurrency] = useState<string>('CAD');
    const [username, setUsername] = useState<string>('test'); //TODO username will be selected from token

    useEffect(() => {
        async function callGetActivities() {
            get(username)
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
                {renderActivityDetails()}
            </IonList>
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

                <IonText>
                    <h4>Activity status : {selectedActivity.activityStatus}</h4>
                    <p>Created by : {selectedActivity.createdBy}</p>
                </IonText>

                {(selectedActivity.expenses.length === undefined || selectedActivity.expenses.length === 0) ?
                    <IonText>
                        <h3>No expenses</h3>
                    </IonText>
                    :
                    <IonText>
                        <h4>Expenses</h4>
                        <p>Number of expenses : {selectedActivity.expenses.length}</p>
                    </IonText>
                }

                <IonText>
                    <h4>Participants</h4>
                    <p>Number of participants : {selectedActivity.userStatus === undefined ? 0 : selectedActivity.userStatus.length}</p>
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

    function renderCreateExpense() {
        return (
            <IonModal isOpen={addExpense}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            New Expense
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonLabel position="stacked">Amount</IonLabel>
                <IonInput value={amount} type='number' placeholder="Enter amount" onIonChange={e => setAmount(parseFloat(e.detail.value!))}/>
                <br/>
                <IonLabel position="stacked">Currency</IonLabel>
                <IonInput value={currency} placeholder="Enter currency" onIonChange={e => setCurrency(e.detail.value!)}/>
                <br/>
                <IonLabel position="stacked">Participant</IonLabel>
                <IonInput value={username} placeholder="Enter participant" onIonChange={e => setUsername(e.detail.value!)}/>
                <IonButton onClick={() => {
                    callCreateExpense(amount, currency, username, selectedActivity);
                }}>
                    Add
                </IonButton>
                <IonButton onClick={() => {
                    setAddExpense(false);
                }}>
                    Close
                </IonButton>
                {getSuccessToast('Successfully retrieved activities')}
                {getErrorToast('An error occurred while retrieving activities. Please try again later.')}
            </IonModal>
        );
    }

    async function callCreateExpense(amount: number, currency: string, username: string, activity: Activity) {
        create(amount, currency, username, activity.id)
            .then(() => setToastSuccess(true))
            .catch(() => setToastError(true));
    }

    function getSuccessToast(message: string) {
        return <IonToast
            isOpen={toastSuccess}
            onDidDismiss={() => setToastSuccess(false)}
            message={message}
            duration={1000}/>;
    }

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
                {renderActivities()}
            </IonContent>
        </IonPage>
    );
};

export default Home;
