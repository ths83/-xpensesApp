import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import ActivitiesScreen from './src/screens/ActivitiesScreen';
import AddActivityScreen from './src/screens/AddActivityScreen';
import {Amplify} from 'aws-amplify';
import ActivityDetailsScreen from './src/screens/ActivityDetailsScreen';
import {
  API_NAME,
  ENDPOINT,
  REGION,
  USER_POOL_ID,
  USER_POOL_WEB_CLIENT_ID,
} from './src/config/AmplifyConfiguration';

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
  },
  {
    initialRouteName: 'Activities',
  },
);

export default createAppContainer(navigator);
