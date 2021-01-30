import {useIsFocused, useNavigation} from '@react-navigation/native';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {Auth} from 'aws-amplify';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';
import {Button, ListItem, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {activityAtom} from '../../../App';
import {ACTIVITY_API} from '../../api/ActivityApi';
import {Pages} from '../../commons/enums/Pages';
import {Status} from '../../commons/enums/Status';
import Activity from '../../model/Activity';
import ActivitySummary from './components/ActivitySummary';

const ActivitiesPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState<Status>(Status.IDLE);

  const [, setActivity] = useAtom(activityAtom);

  const {navigate} = useNavigation();

  const isFocused = useIsFocused();

  async function getActivities() {
    setStatus(Status.IN_PROGRESS);
    ACTIVITY_API.getByUser()
      .then((activity) => {
        const mappedActivities = activity.map((a: any) => {
          return new Activity(
            a.id,
            a.name,
            a.createdBy,
            a.expenses,
            a.users,
            a.date,
          );
        });
        setActivities(mappedActivities);
        setStatus(Status.SUCCESS);
      })
      .catch(() => {
        setStatus(Status.ERROR);
      });
  }

  function refreshActivities() {
    setRefreshing(true);
    getActivities();
    setRefreshing(false);
  }

  const onRefresh = useCallback(refreshActivities, []);

  useEffect(() => {
    getActivities();
  }, [isFocused]);

  function renderActivities() {
    return activities.map((activity, i) => (
      <ListItem
        key={i}
        onPress={() => {
          setActivity(activity);
          navigate(Pages.ACTIVITY_DETAILS);
        }}
        bottomDivider>
        <ActivitySummary activity={activity} />
      </ListItem>
    ));
  }

  function render() {
    if (status === Status.IDLE || status === Status.IN_PROGRESS) {
      return <Text>Loading...</Text>;
    } else if (status === Status.ERROR) {
      return <Text>An error occurred while fetching activities</Text>;
    } else if (status === Status.SUCCESS) {
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
