import React, {useState} from 'react';
import {IonButton, IonContent, IonHeader, IonInput, IonLabel, IonPage, IonTitle, IonToast, IonToolbar} from '@ionic/react';
import './Tab2.css';
import {API_NAME} from '../App';
import {API, Auth} from 'aws-amplify';

const Tab2: React.FC = () => {

    const [name, setName] = useState<string>();
    const [createdBy, setCreatedBy] = useState<string>();
    const [toastSuccess, setToastSuccess] = useState(false);
    const [toastError, setToastError] = useState(false);

    async function createActivity() {
        const apiName = API_NAME;
        const path = '/activities';
        const myInit = {
            headers: {
                'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            },
            body: {
                name: name,
                createdBy: createdBy
            },
        };
        await API.post(apiName, path, myInit)
            .then(() => setToastSuccess(true))
            .catch(() => setToastError(true));
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>New activity</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonLabel position="stacked">Name</IonLabel>
                <IonInput value={name} placeholder="Enter Activity Name" onIonChange={e => setName(e.detail.value!)}/>
                <br/>
                <IonLabel position="stacked">CreatedBy</IonLabel>
                <IonInput value={createdBy} placeholder="Enter owner" onIonChange={e => setCreatedBy(e.detail.value!)}/>
            </IonContent>
            <IonButton expand="block" color="primary" onClick={() => createActivity()}>
                Create
            </IonButton>

            <IonToast
                isOpen={toastSuccess}
                onDidDismiss={() => setToastSuccess(false)}
                message="Success !"
                duration={1000}/>

            <IonToast
                isOpen={toastError}
                onDidDismiss={() => setToastError(false)}
                message="An error occurred while creating the activity. Please try again later."
                duration={2000}/>
        </IonPage>
    );
};

export default Tab2;
