import {useIsFocused, useNavigation} from '@react-navigation/native';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {Auth} from 'aws-amplify';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';
import {Button, ListItem, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {ACTIVITY_API} from '../../api/ActivityApi';
import ActivitySummary from '../../components/activities/ActivitySummary';
import {Pages} from '../../enums/Pages';
import {Status} from '../../enums/Status';
import {Activity} from '../../model/Activity';
import activityAtom from '../../state/Activity';
import userAtom from '../../state/User';
import {toYYYY_MM_DD} from '../../utils/DateFormatter';

const ActivitiesPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState<Status>(Status.IDLE);

  const [, setUsername] = useAtom(userAtom);
  const [, setActivity] = useAtom(activityAtom);

  const {navigate} = useNavigation();

  const isFocused = useIsFocused();

  useEffect(() => {
    getCurrentUsername();
  }, []);

  useEffect(() => {
    getActivities();
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getActivities();
    setRefreshing(false);
  }, []);

  async function getCurrentUsername() {
    const user: CognitoUser = await Auth.currentAuthenticatedUser();
    setUsername(user.getUsername());
  }

  async function getActivities() {
    setStatus(Status.IN_PROGRESS);
    ACTIVITY_API.getByUser()
      .then((fetchedActivities) => {
        fetchedActivities.map((activity: Activity) => {
          activity.date = toYYYY_MM_DD(activity.date);
          return activity;
        });
        setActivities(fetchedActivities);
        setStatus(Status.SUCCESS);
      })
      .catch(() => {
        setStatus(Status.ERROR);
      });
  }

  function renderActivities() {
    return activities.map((activity, i) => (
      <>
        <ListItem
          key={i}
          onPress={() => {
            // does not set activity the first time, need to call it again (component issue ?)
            setActivity(activity);
            setActivity(activity);
            navigate(Pages.ACTIVITY_DETAILS);
          }}>
          <ActivitySummary activity={activity} />
        </ListItem>
      </>
    ));
  }

  function render() {
    if (status === Status.ERROR) {
      return <Text>An error occurred while fetching activities</Text>;
    } else {
      return (
        <>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {renderActivities()}
          </ScrollView>
          <View>
            <Button
              title={'New activity'}
              onPress={() => navigate(Pages.ADD_ACTIVITY)}
            />
          </View>
        </>
      );
    }
  }

  return render();
};

export default ActivitiesPage;
