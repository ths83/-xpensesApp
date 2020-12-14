import {API_NAME} from '../App';
import {API, Auth} from 'aws-amplify';

export async function create(name: string, createdBy: string) {
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
    console.log('Calling createActivity endpoint...')
    return await API.post(apiName, path, myInit);
}

export async function get(username: string) {
    const apiName = API_NAME;
    const path = '/activities?username=' + username;
    const myInit = {
        headers: {
            'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
        },
    };
    console.log('Calling getActivity endpoint...')
    return await API.get(apiName, path, myInit);
}
