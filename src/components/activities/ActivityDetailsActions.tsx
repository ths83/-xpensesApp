import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {BottomSheet, ListItem} from 'react-native-elements';
import {ActivityStatus} from '../../enums/ActivityStatus';
import {Pages} from '../../enums/Pages';
import activityAtom from '../../state/Activity';
import {lightGrey, red, white} from '../../themes/colors';

interface ActivityDetailsActionsProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const ActivityDetailsActions = ({
  visible,
  setVisible,
}: ActivityDetailsActionsProps) => {
  const [activity] = useAtom(activityAtom);

  const {navigate} = useNavigation();

  const addExpense = (
    <ListItem
      key={0}
      onPress={() => {
        setVisible(false);
        navigate(Pages.ADD_EXPENSE);
      }}
      containerStyle={styles.lightGrey}>
      <ListItem.Content style={styles.center}>
        <ListItem.Title>Add expense</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  const activityDetails = (
    <ListItem
      key={1}
      onPress={() => {
        setVisible(false);
        navigate(Pages.ACTIVITY_DETAILS);
      }}
      containerStyle={styles.lightGrey}>
      <ListItem.Content style={styles.center}>
        <ListItem.Title>Go to activity details</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  const back = (
    <ListItem
      key={2}
      onPress={() => setVisible(false)}
      containerStyle={styles.red}>
      <ListItem.Content style={styles.center}>
        <ListItem.Title style={styles.white}>Back</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  const actions = [addExpense, activityDetails, back];
  const activityClosedActions = [activityDetails, back];

  return (
    <>
      <BottomSheet isVisible={visible}>
        {activity.activityStatus === ActivityStatus.DONE
          ? activityClosedActions
          : actions}
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  red: {
    backgroundColor: red,
  },
  center: {
    alignItems: 'center',
  },
  white: {
    color: white,
  },
  lightGrey: {
    backgroundColor: lightGrey,
  },
});

export default memo(ActivityDetailsActions);
