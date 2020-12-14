import {IonButton, IonIcon, IonItem, IonLabel, IonList, IonModal} from '@ionic/react';
import {ellipse} from 'ionicons/icons';
import React, {useState} from 'react';
import Activity from '../../model/Activity';
import Expense from '../expense/Expense';
import ActivityDetails from './ActivityDetails';

const EMPTY_ACTIVITY = new Activity('', '', '', [], '', []);

export default function ActivityList({activities = [EMPTY_ACTIVITY]}) {

    const [selectedActivity, setSelectedActivity] = useState<Activity>(EMPTY_ACTIVITY);
    const [activityDetails, setActivityDetails] = useState(false);
    const [addExpense, setAddExpense] = useState(false);

    function renderActivityDetails() {
        return (
            <IonModal isOpen={activityDetails}>
                <ActivityDetails activity={selectedActivity}/>

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
                <Expense activity={selectedActivity}/>

                <IonButton onClick={() => setAddExpense(false)}>
                    Close
                </IonButton>
            </IonModal>
        );
    }

    return (
        <IonList>
            {
                activities.map(activity => {
                        return (
                            <IonItem key={activity.id} button onClick={() => {
                                setSelectedActivity(activity);
                                setActivityDetails(true);
                            }}>
                                <IonLabel>{activity.name}</IonLabel>
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
