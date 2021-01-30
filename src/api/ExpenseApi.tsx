import {API, Auth} from 'aws-amplify';
import {Currency} from '../commons/enums/Currency';
import {API_NAME} from '../config/AmplifyConfiguration';

export class ExpenseApi {
  constructor() {}

  async create(name: string, amount: string, activityId: string) {
    const user = await Auth.currentAuthenticatedUser();

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
        currency: Currency.CANADA,
        user: user.username,
        activityId: activityId,
      },
    };
    console.debug('Adding new expense...');
    return await API.post(apiName, path, myInit);
  }

  async getByActivityId(activityId: string) {
    const apiName = API_NAME;
    const path = `/expenses?activityId=${activityId}`;
    const myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
      },
    };
    console.debug(`Retrieving expenses for activity '${activityId}'...`);
    return await API.get(apiName, path, myInit);
  }
}
export const EXPENSE_API = new ExpenseApi();
