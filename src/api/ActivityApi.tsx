import {API, Auth} from 'aws-amplify';
import {API_NAME} from '../config/AmplifyConfiguration';

export class ActivityApi {
  constructor() {}

  async create(name: string) {
    const user = await Auth.currentAuthenticatedUser();

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
        createdBy: user.username,
      },
    };
    console.log('Adding new activity...');
    return await API.post(apiName, path, myInit);
  }

  async getByUser() {
    const user = await Auth.currentAuthenticatedUser();

    const apiName = API_NAME;
    const path = `/activities?username=${user.username}`;
    const myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
      },
    };
    console.log(`Retrieving activities from username '${user.username}'...`);
    return await API.get(apiName, path, myInit);
  }

  async getById(id: string) {
    const apiName = API_NAME;
    const path = `/activities/${id}`;
    const myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
      },
    };
    console.log(`Retrieving activity ${id}...`);
    return await API.get(apiName, path, myInit);
  }

  async deleteExpense(id: string, expenseId: string) {
    const apiName = API_NAME;
    const path = `/activities/${id}/expenses/${expenseId}`;
    const myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
      },
    };
    console.log(`Deleting expense '${expenseId}' from activity '${id}'...`);
    return await API.del(apiName, path, myInit);
  }
}
export const ACTIVITY_API = new ActivityApi();
