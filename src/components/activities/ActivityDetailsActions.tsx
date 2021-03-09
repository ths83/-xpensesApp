import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {BottomSheet, ListItem} from 'react-native-elements';
import {Pages} from '../../enums/Pages';
import {lightGrey, red, white} from '../../themes/colors';

interface ActivityDetailsActionsProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const ActivityDetailsActions = ({
  visible,
  setVisible,
}: ActivityDetailsActionsProps) => {
  const {navigate} = useNavigation();

  const addExpense = (
    <ListItem
      key={0}
      onPress={() => {
        setVisible(false);
        navigate(Pages.ADD_EXPENSE);
      }}
      containerStyle={styles.buttonItem}>
      <ListItem.Content style={styles.buttonItemContent}>
        <ListItem.Title>Add expense</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  const updateActivity = (
    <ListItem
      key={0}
      onPress={() => {
        setVisible(false);
        navigate(Pages.ACTIVITY_DETAILS);
      }}
      containerStyle={styles.buttonItem}>
      <ListItem.Content style={styles.buttonItemContent}>
        <ListItem.Title>Go to activity details</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  const back = (
    <ListItem
      key={2}
      onPress={() => setVisible(false)}
      containerStyle={styles.backButtonItem}>
      <ListItem.Content style={styles.buttonItemContent}>
        <ListItem.Title style={styles.buttonItemContentTitle}>
          Back
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  const actions = [addExpense, updateActivity, back];

  return (
    <>
      <BottomSheet isVisible={visible}>{actions}</BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  backButtonItem: {
    backgroundColor: red,
  },
  buttonItemContent: {
    alignItems: 'center',
  },
  buttonItemContentTitle: {
    color: white,
  },
  buttonItem: {
    backgroundColor: lightGrey,
  },
});

export default memo(ActivityDetailsActions);
