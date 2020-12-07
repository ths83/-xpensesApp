import {API_NAME} from '../App';
import {API, Auth} from 'aws-amplify';
import React from 'react';

export async function createActivity(name: string, createdBy: string) {
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
    return await API.post(apiName, path, myInit);
}

export async function getActivities(username: string) {
    const apiName = API_NAME;
    const path = '/activities?username=' + username;
    const myInit = {
        headers: {
            'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
        },
    };
    return await API.get(apiName, path, myInit);
}
