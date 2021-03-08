import {CognitoUser} from 'amazon-cognito-identity-js';
import {API, Auth} from 'aws-amplify';
import {API_NAME} from '../config/AmplifyConfiguration';
import {Activity} from '../model/Activity';

export class ActivityApi {
  constructor() {}

  async create(name: string): Promise<Activity> {
    const user: CognitoUser = await Auth.currentAuthenticatedUser();

    const apiName = API_NAME;
    const path = '/activities';
    const myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
      },
      body: {
        activityName: name,
        createdBy: user.getUsername(),
      },
    };
    console.debug('Adding new activity...');
    return await API.post(apiName, path, myInit);
  }

  async getByUser(): Promise<Activity[]> {
    const user: CognitoUser = await Auth.currentAuthenticatedUser();

    const apiName = API_NAME;
    const path = `/activities?username=${user.getUsername()}`;
    const myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
      },
    };
    console.debug(
      `Retrieving activities from username '${user.getUsername()}'...`,
    );
    return await API.get(apiName, path, myInit);
  }

  async getById(id: string): Promise<Activity> {
    const apiName = API_NAME;
    const path = `/activities/${id}`;
    const myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
      },
    };
    console.debug(`Retrieving activity '${id}'...`);
    return await API.get(apiName, path, myInit);
  }

  async deleteExpense(id: string, expenseId: string): Promise<void> {
    const apiName = API_NAME;
    const path = `/activities/${id}/expenses/${expenseId}`;
    const myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
      },
    };
    console.debug(`Deleting expense '${expenseId}' from activity '${id}'...`);
    return await API.del(apiName, path, myInit);
  }

  async update(id: string, name: string, date: string): Promise<void> {
    const apiName = API_NAME;
    const path = `/activities/${id}`;
    const myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
      },
      body: {
        activityName: name,
        date: date,
      },
    };
    console.debug(`Updating activity '${id}'...`);
    return await API.put(apiName, path, myInit);
  }

  async delete(id: string): Promise<void> {
    const apiName = API_NAME;
    const path = `/activities/${id}`;
    const myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
      },
      body: {
        id: id,
      },
    };
    console.debug(`Deleting activity '${id}'...`);
    return await API.del(apiName, path, myInit);
  }
}
export const ACTIVITY_API = new ActivityApi();
