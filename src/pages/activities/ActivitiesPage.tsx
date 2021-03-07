import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, StyleSheet, View} from 'react-native';
import {Button, ListItem, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {ACTIVITY_API} from '../../api/ActivityApi';
import ActivitySummary from '../../components/activities/ActivitySummary';
import {Pages} from '../../enums/Pages';
import {Status} from '../../enums/Status';
import {Activity} from '../../model/Activity';
import activityAtom from '../../state/Activity';
import userAtom from '../../state/User';
import {blue} from '../../themes/colors';
import {sMedium} from '../../themes/size';
import {format} from '../../utils/DateFormatter';

const ActivitiesPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState<Status>(Status.IDLE);

  const [, setUsername] = useAtom(userAtom);
  const [, setActivity] = useAtom(activityAtom);

  const {navigate} = useNavigation();

  const isFocused = useIsFocused();

  const getCurrentUsername = useCallback(async () => {
    return await Auth.currentAuthenticatedUser();
  }, []);

  useEffect(() => {
    getCurrentUsername().then((response) => setUsername(response.username));
  }, [getCurrentUsername, setUsername]);

  useEffect(() => {
    if (isFocused) {
      getActivities();
    }
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getActivities();
    setRefreshing(false);
  }, []);

  async function getActivities() {
    setStatus(Status.IN_PROGRESS);
    ACTIVITY_API.getByUser()
      .then((fetchedActivities) => {
        fetchedActivities.map((activity: Activity) => {
          activity.startDate = format(activity.startDate);
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
            setActivity(activity);
            navigate(Pages.EXPENSES);
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
              buttonStyle={styles.button}
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

const styles = StyleSheet.create({
  button: {
    backgroundColor: blue,
    paddingBottom: sMedium,
  },
});

export default ActivitiesPage;
