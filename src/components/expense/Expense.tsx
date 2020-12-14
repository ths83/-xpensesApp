import {IonButton, IonContent, IonHeader, IonInput, IonLabel, IonTitle, IonToast, IonToolbar} from '@ionic/react';
import React, {useState} from 'react';
import Activity from '../../model/Activity';
import {create} from '../../api/ExpenseApiService';

const EMPTY_ACTIVITY = new Activity('', '', '', [], '', []);

export default function Expense({activity = EMPTY_ACTIVITY}) {

    const [amount, setAmount] = useState<number>(0);
    const [currency, setCurrency] = useState<string>('CAD');
    const [username, setUsername] = useState<string>('test'); //TODO username will be selected from token
    const [toastError, setToastError] = useState(false);
    const [toastSuccess, setToastSuccess] = useState(false);

    async function callCreateExpense(amount: number, currency: string, username: string, activity: Activity) {
        create(amount, currency, username, activity.id)
            .then(() => setToastSuccess(true))
            .catch(() => setToastError(true));
    }

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

    return (
        <>
            <IonContent>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            New Expense
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonLabel position="stacked">Amount</IonLabel>
                <IonInput value={amount} type='number' placeholder="Enter amount"
                          onIonChange={e => setAmount(parseFloat(e.detail.value!))}/>
                <br/>

                <IonLabel position="stacked">Currency</IonLabel>
                <IonInput value={currency} placeholder="Enter currency" onIonChange={e => setCurrency(e.detail.value!)}/>
                <br/>

                <IonLabel position="stacked">Participant</IonLabel>
                <IonInput value={username} placeholder="Enter participant" onIonChange={e => setUsername(e.detail.value!)}/>

                <IonButton onClick={() => callCreateExpense(amount, currency, username, activity)}>
                    Add
                </IonButton>

                {getSuccessToast('Expense successfully created.')}
                {getErrorToast('An error occurred while creating expense. Please try again later.')}

            </IonContent>
        </>
    );

}
