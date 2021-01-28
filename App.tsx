import 'react-native-gesture-handler';
import React from 'react';
import {Amplify} from 'aws-amplify';
import {
  API_NAME,
  ENDPOINT,
  REGION,
  USER_POOL_ID,
  USER_POOL_WEB_CLIENT_ID,
} from './src/config/AmplifyConfiguration';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ActivitiesScreen from './src/screens/activities/ActivitiesScreen';
import AddActivityScreen from './src/screens/addActivity/AddActivityScreen';
import ActivityDetailsScreen from './src/screens/activityDetails/ActivityDetailsScreen';
import AddExpenseScreen from './src/screens/addExpense/AddExpenseScreen';
import {withAuthenticator} from 'aws-amplify-react-native';
import AppHeader from './src/commons/components/AppHeader';
import {atom, Provider} from 'jotai';
import Activity from './src/model/Activity';
import {setCustomText, setCustomTextInput} from 'react-native-global-props';
import ExpenseDetailsScreen from './src/screens/expenseDetails/ExpenseDetailsScreen';
import Expense from './src/model/Expense';

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

export const activityAtom = atom(new Activity('', '', '', [], [], ''));
export const expenseAtom = atom(new Expense('', '', 0, '', '', ''));

// TODO export const currentUsernameAtom = atom('');

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
            component={ActivitiesScreen}
            options={{
              header: () => <AppHeader />,
            }}
          />
          <Stack.Screen
            name="AddActivity"
            component={AddActivityScreen}
            options={{
              header: () => <AppHeader />,
            }}
          />
          <Stack.Screen
            name="ActivityDetails"
            component={ActivityDetailsScreen}
            options={{
              header: () => <AppHeader />,
            }}
          />
          <Stack.Screen
            name="AddExpense"
            component={AddExpenseScreen}
            options={{
              header: () => <AppHeader />,
            }}
          />
          <Stack.Screen
            name="ExpenseDetails"
            component={ExpenseDetailsScreen}
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
