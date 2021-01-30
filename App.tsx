import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Amplify} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import {atom, Provider} from 'jotai';
import React from 'react';
import 'react-native-gesture-handler';
import {setCustomText, setCustomTextInput} from 'react-native-global-props';
import AppHeader from './src/commons/components/AppHeader';
import {
  API_NAME,
  ENDPOINT,
  REGION,
  USER_POOL_ID,
  USER_POOL_WEB_CLIENT_ID,
} from './src/config/AmplifyConfiguration';
import Activity, {EMPTY_ACTIVITY} from './src/model/Activity';
import Expense, {EMPTY_EXPENSE} from './src/model/Expense';
import ActivitiesPage from './src/pages/activities/ActivitiesPage';
import ActivityDetailsPage from './src/pages/activityDetails/ActivityDetailsPage';
import AddActivityPage from './src/pages/addActivity/AddActivityPage';
import AddExpensePage from './src/pages/addExpense/AddExpensePage';
import ExpenseDetailsPage from './src/pages/expenseDetails/ExpenseDetailsPage';

Amplify.configure({
  Auth: {
    region: REGION,
    userPoolId: USER_POOL_ID,
    userPoolWebClientId: USER_POOL_WEB_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: API_NAME,
        endpoint: ENDPOINT,
      },
    ],
  },
});

export const activityAtom = atom<Activity>(EMPTY_ACTIVITY);
export const expenseAtom = atom<Expense>(EMPTY_EXPENSE);

const Stack = createStackNavigator();
const App = () => {
  const customTextProps = {
    style: {
      fontFamily: 'Arial',
    },
  };

  setCustomText(customTextProps);
  setCustomTextInput(customTextProps);

  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Activities"
            component={ActivitiesPage}
            options={{
              header: () => <AppHeader />,
            }}
          />
          <Stack.Screen
            name="AddActivity"
            component={AddActivityPage}
            options={{
              header: () => <AppHeader />,
            }}
          />
          <Stack.Screen
            name="ActivityDetails"
            component={ActivityDetailsPage}
            options={{
              header: () => <AppHeader />,
            }}
          />
          <Stack.Screen
            name="AddExpense"
            component={AddExpensePage}
            options={{
              header: () => <AppHeader />,
            }}
          />
          <Stack.Screen
            name="ExpenseDetails"
            component={ExpenseDetailsPage}
            options={{
              header: () => <AppHeader />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default withAuthenticator(App);
