import {CognitoUser} from 'amazon-cognito-identity-js';
import {API, Auth} from 'aws-amplify';
import {API_NAME} from '../config/AmplifyConfiguration';
import {Currency} from '../enums/Currency';
import {Expense} from '../model/Expense';

export class ExpenseApi {
  constructor() {}

  async create(
    name: string,
    amount: string,
    activityId: string,
  ): Promise<Expense> {
    const user: CognitoUser = await Auth.currentAuthenticatedUser();

    const apiName = API_NAME;
    const path = '/expenses';
    const myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
      },
      body: {
        expenseName: name,
        amount: amount,
        currency: Currency.CANADA,
        user: user.getUsername(),
        activityId: activityId,
      },
    };
    console.debug('Adding new expense...');
    return await API.post(apiName, path, myInit);
  }

  async getByActivityId(activityId: string): Promise<Expense[]> {
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

  async update(expense: Expense): Promise<void> {
    const apiName = API_NAME;
    const path = `/expenses/${expense.id}`;
    const myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
      },
      body: {
        expenseName: expense.expenseName,
        amount: expense.amount,
        user: expense.user,
        startDate: expense.startDate,
        currency: expense.currency,
      },
    };
    console.debug(`Updating expense '${expense.id}'...`);
    return await API.put(apiName, path, myInit);
  }
}
export const EXPENSE_API = new ExpenseApi();
