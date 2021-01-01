import React, {useEffect, useState} from 'react';
import {Button, ListItem} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import Activity from '../../model/Activity';
import {getActivityByUsername} from '../../api/ActivityService';
import ActivityDetails from './component/ActivityDetails';
import {useNavigation} from '@react-navigation/native';
import {TEST_USER} from '../../config/UsersConfiguration';

const ActivitiesScreen = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const {navigate} = useNavigation();

  async function callGetActivities() {
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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    callGetActivities();
  }, []);

  return (
    <>
      <ScrollView>
        {activities.map((activity, i) => (
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
        ))}
      </ScrollView>
      <Button title={'New activity'} onPress={() => navigate('AddActivity')} />
    </>
  );
};

export default ActivitiesScreen;
