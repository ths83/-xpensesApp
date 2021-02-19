import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Amplify} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import {Provider} from 'jotai';
import React from 'react';
import 'react-native-gesture-handler';
import AppHeader from './src/components/header/AppHeader';
import {
  API_NAME,
  ENDPOINT,
  REGION,
  USER_POOL_ID,
  USER_POOL_WEB_CLIENT_ID,
} from './src/config/AmplifyConfiguration';
import {Pages} from './src/enums/Pages';
import ActivitiesPage from './src/pages/activities/ActivitiesPage';
import UpdateActivityPage from './src/pages/activityDetails/ActivityDetailsPage';
import AddActivityPage from './src/pages/addActivity/AddActivityPage';
import AddExpensePage from './src/pages/addExpense/AddExpensePage';
import ExpenseDetailsPage from './src/pages/expenseDetails/ExpenseDetailsPage';
import ExpensesPage from './src/pages/expenses/ExpensesPage';

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

const Stack = createStackNavigator();
const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={Pages.ACTIVITIES}
            component={ActivitiesPage}
            options={{
              header: () => <AppHeader />,
            }}
          />
          <Stack.Screen
            name={Pages.ADD_ACTIVITY}
            component={AddActivityPage}
            options={{
              header: () => <AppHeader />,
            }}
          />
          <Stack.Screen
            name={Pages.ACTIVITY_DETAILS}
            component={UpdateActivityPage}
            options={{
              header: () => <AppHeader />,
            }}
          />
          <Stack.Screen
            name={Pages.ADD_EXPENSE}
            component={AddExpensePage}
            options={{
              header: () => <AppHeader />,
            }}
          />
          <Stack.Screen
            name={Pages.EXPENSE_DETAILS}
            component={ExpenseDetailsPage}
            options={{
              header: () => <AppHeader />,
            }}
          />
          <Stack.Screen
            name={Pages.EXPENSES}
            component={ExpensesPage}
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
