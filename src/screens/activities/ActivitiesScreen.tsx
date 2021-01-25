import React, {useCallback, useEffect, useState} from 'react';
import {Button, ListItem, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import Activity from '../../model/Activity';
import {getActivityByUsername} from '../../api/ActivityService';
import ActivityDetails from './components/ActivityDetails';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {TEST_USER} from '../../config/UsersConfiguration';
import {RefreshControl} from 'react-native';
import {Status} from '../../commons/enums/Status';
import {useAtom} from 'jotai';
import {activityAtom} from '../../../App';

const ActivitiesScreen = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState<Status>(Status.IDLE);

  const [, setActivity] = useAtom(activityAtom);

  const {navigate} = useNavigation();

  const isFocused = useIsFocused()

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
            a.users,
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
    console.log('Activities fetched !')
    getActivities();
  }, [isFocused]);


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
          setActivity(activity);
          navigate('ActivityDetails');
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
