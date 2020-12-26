import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {Amplify} from 'aws-amplify';
import {
  API_NAME,
  ENDPOINT,
  REGION,
  USER_POOL_ID,
  USER_POOL_WEB_CLIENT_ID,
} from './src/config/AmplifyConfiguration';
import AddActivityScreen from './src/screens/addActivity/AddActivityScreen';
import ActivityDetailsScreen from './src/screens/activityDetails/ActivityDetailsScreen';
import ActivitiesScreen from './src/screens/activities/ActivitiesScreen';
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

const navigator = createStackNavigator(
  {
    Activities: ActivitiesScreen,
    AddActivity: AddActivityScreen,
    ActivityDetails: ActivityDetailsScreen,
    AddExpense: AddExpenseScreen,
  },
  {
    initialRouteName: 'Activities',
  },
);

export default createAppContainer(navigator);
