import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';
import {Button, ListItem, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {activityAtom} from '../../../App';
import {getActivityByUsername} from '../../api/ActivityService';
import {Status} from '../../commons/enums/Status';
import {TEST_USER} from '../../config/UsersConfiguration';
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
    console.log('Activities fetched !');
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
              onPress={() => navigate('AddActivity')}
            />
          </View>
        </>
      );
    }
  }

  return render();
};

export default ActivitiesPage;
