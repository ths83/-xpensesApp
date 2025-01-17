import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, StyleSheet, View} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {ACTIVITY_API} from '../../api/ActivityApi';
import ActivitySummary from '../../components/activities/ActivitySummary';
import AddButton from '../../components/buttons/AddButton';
import Error from '../../components/status/Error';
import Loading from '../../components/status/Loading';
import {ActivityStatus} from '../../enums/ActivityStatus';
import {Pages} from '../../enums/Pages';
import {Status} from '../../enums/Status';
import {Activity} from '../../model/Activity';
import activityAtom from '../../state/Activity';
import userAtom from '../../state/User';
import {green} from '../../themes/colors';
import {iSmall} from '../../themes/icons';
import {sMedium} from '../../themes/size';
import {formatDate} from '../../utils/dateFormatter';

const ActivitiesPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState<Status>(Status.IDLE);

  const [, setUsername] = useAtom(userAtom);
  const [, setActivity] = useAtom(activityAtom);

  const {navigate} = useNavigation();

  const isFocused = useIsFocused();

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((response) =>
      setUsername(response.username),
    );
  }, [setUsername]);

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
          activity.startDate = formatDate(activity.startDate);
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
          }}
          onLongPress={() => {
            setActivity(activity);
            navigate(Pages.ACTIVITY_DETAILS);
          }}>
          <ActivitySummary activity={activity} />
          {activity.activityStatus === ActivityStatus.DONE && (
            <Icon
              name="check"
              type="font-awesome-5"
              size={iSmall}
              color={green}
            />
          )}
        </ListItem>
      </>
    ));
  }

  return (
    <>
      {(status === Status.IN_PROGRESS || status === Status.IDLE) && <Loading />}
      {status === Status.ERROR && (
        <Error text="An error occurred while fetching activities" />
      )}
      {status === Status.SUCCESS && (
        <>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {renderActivities()}
          </ScrollView>
          <View style={styles.buttonsContainer}>
            <AddButton onPress={() => navigate(Pages.ADD_ACTIVITY)} />
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    margin: sMedium,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default ActivitiesPage;
