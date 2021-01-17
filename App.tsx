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
import CreateActivityScreen from './src/screens/createActivity/CreateActivityScreen';
import ActivityDetailsScreen from './src/screens/activityDetails/ActivityDetailsScreen';
import AddExpenseScreen from './src/screens/addExpense/AddExpenseScreen';
import {withAuthenticator} from 'aws-amplify-react-native';
import AppHeader from './src/shared/component/AppHeader';

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
          component={CreateActivityScreen}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default withAuthenticator(App);
