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
        <Stack.Screen name="Activities" component={ActivitiesScreen} />
        <Stack.Screen name="AddActivity" component={CreateActivityScreen} />
        <Stack.Screen
          name="ActivityDetails"
          component={ActivityDetailsScreen}
        />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
