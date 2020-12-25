import React, {useEffect, useState} from 'react';
import {getActivityByUsername} from '../api/ActivityService';
import Activity from '../model/Activity';
import {Button, ListItem} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

const ActivitiesScreen = (props) => {
  const [activities, setActivities] = useState<Activity[]>([]);

  async function callGetActivities() {
    getActivityByUsername('test')
      .then((activity) => {
        const mappedActivities = activity.map((a: any) => {
          return new Activity(
            a.id,
            a.name,
            a.createdBy,
            a.expenses,
            a.activityStatus,
            a.userStatus,
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
              props.navigation.navigate('ActivityDetails', {
                activityId: activity.id,
              });
            }}
            bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{activity.name}</ListItem.Title>
              {/*TODO get time from API*/}
              <ListItem.Subtitle>please add time</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
      <Button
        title={'Add activity'}
        onPress={() => props.navigation.navigate('AddActivity')}
      />
    </>
  );
};

export default ActivitiesScreen;
