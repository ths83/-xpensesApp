import {API} from 'aws-amplify';
import {API_NAME} from '../config/AmplifyConfiguration';

export async function createExpense(
  amount: number,
  currency: string,
  userId: string,
  activityId: string,
) {
  const apiName = API_NAME;
  const path = '/expenses';
  const myInit = {
    headers: {},
    body: {
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
  const path = '/expenses/' + id;
  const myInit = {
    headers: {},
  };
  console.log('Retrieving expense by id...');
  return await API.get(apiName, path, myInit);
}
