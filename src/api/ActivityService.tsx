import {API, Auth} from 'aws-amplify';
import {API_NAME} from '../config/AmplifyConfiguration';

export async function createActivity(name: string, createdBy: string) {
  const apiName = API_NAME;
  const path = '/activities';
  const myInit = {
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
    },
    body: {
      name: name,
      createdBy: createdBy,
    },
  };
  console.log('Adding new activity...');
  return await API.post(apiName, path, myInit);
}

export async function getActivityByUsername(username: string) {
  const apiName = API_NAME;
  const path = `/activities?username=${username}`;
  const myInit = {
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
    },
  };
  console.log(`Retrieving activity from username '${username}'...`);
  return await API.get(apiName, path, myInit);
}

export async function delExpenseFromActivity(
  activityId: string,
  expenseId: string,
) {
  const apiName = API_NAME;
  const path = `/activities/${activityId}/expenses/${expenseId}`;
  const myInit = {
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
    },
  };
  console.log(
    `Deleting expense '${expenseId}' from activity '${expenseId}'...`,
  );
  return await API.del(apiName, path, myInit);
}
