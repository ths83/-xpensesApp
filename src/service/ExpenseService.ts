import {API_NAME} from '../App';
import {API, Auth} from 'aws-amplify';

export async function create(amount: number, currency: string, userId: string, activityId: string) {

    const apiName = API_NAME;
    const path = '/expenses';
    const myInit = {
        headers: {
            'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
        },
        body: {
            amount: amount,
            currency: currency,
            userId: userId,
            activityId: activityId
        },
    };
    return await API.post(apiName, path, myInit);
}
