import React, {useCallback, useEffect, useState} from 'react';
import {Button, ListItem, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import Activity from '../../model/Activity';
import {getActivityByUsername} from '../../api/ActivityService';
import ActivityDetails from './component/ActivityDetails';
import {useNavigation} from '@react-navigation/native';
import {TEST_USER} from '../../config/UsersConfiguration';
import {RefreshControl} from 'react-native';
import {Status} from '../../shared/constant/Status';

const ActivitiesScreen = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const {navigate} = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const [status, setStatus] = useState<Status>(Status.IDLE);

  async function getActivities() {
    setStatus(Status.IN_PROGRESS);
    getActivityByUsername(TEST_USER)
      .then((activity) => {
        const mappedActivities = activity.map((a: any) => {
          return new Activity(
            a.id,
            a.name,
            a.createdBy,
            a.expenses,
            a.activityStatus,
            a.usersStatus,
            a.date,
          );
        });
        setActivities(mappedActivities);
        setStatus(Status.SUCCESS);
      })
      .catch((error) => {
        console.log(error);
        setStatus(Status.ERROR);
      });
  }

  useEffect(() => {
    getActivities();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getActivities();
    setRefreshing(false);
  }, []);

  function renderActivities() {
    return activities.map((activity, i) => (
      <ListItem
        key={i}
        onPress={() => {
          navigate('ActivityDetails', {
            activityId: activity.id,
          });
        }}
        bottomDivider>
        <ActivityDetails activity={activity} />
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
          <Button
            title={'New activity'}
            onPress={() => navigate('AddActivity')}
          />
        </>
      );
    }
  }

  return render();
};

export default ActivitiesScreen;
