import {API, Auth} from 'aws-amplify';
import {API_NAME} from '../config/AmplifyConfiguration';

export async function createExpense(
  name: string,
  amount: string,
  currency: string,
  userId: string,
  activityId: string,
) {
  const apiName = API_NAME;
  const path = '/expenses';
  const myInit = {
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
    },
    body: {
      name: name,
      amount: amount,
      currency: currency,
      userId: userId,
      activityId: activityId,
    },
  };
  console.log('Creating new expense...');
  return await API.post(apiName, path, myInit);
}

export async function getExpenseById(id: string) {
  const apiName = API_NAME;
  const path = `/expenses/${id}`;
  const myInit = {
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
    },
  };
  console.log(`Retrieving expense '${id}'...`);
  return await API.get(apiName, path, myInit);
}
