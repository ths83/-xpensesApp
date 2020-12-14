import React from 'react';
import {IonContent, IonHeader, IonText, IonTitle, IonToolbar} from '@ionic/react';
import Activity from '../../model/Activity';

const EMPTY_ACTIVITY = new Activity('', '', '', [], '', []);

export default function ActivityDetails({activity = EMPTY_ACTIVITY}) {

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        {activity.name}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonText>
                    <h4>Activity status : {activity.activityStatus}</h4>
                    <p>Created by : {activity.createdBy}</p>
                </IonText>

                {(activity.expenses.length === undefined || activity.expenses.length === 0) ?
                    <IonText>
                        <h3>No expenses</h3>
                    </IonText>
                    :
                    <IonText>
                        <h4>Expenses</h4>
                        <p>Number of expenses : {activity.expenses.length}</p>
                    </IonText>
                }

                <IonText>
                    <h4>Participants</h4>
                    <p>Number of participants : {activity.userStatus === undefined ? 0 : activity.userStatus.length}</p>
                </IonText>
            </IonContent>
        </>
    );
}
