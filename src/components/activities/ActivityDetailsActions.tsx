import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {BottomSheet, ListItem, Text} from 'react-native-elements';
import {ExpensesFilter} from '../../enums/ExpensesFilter';
import {Pages} from '../../enums/Pages';
import {blue, lightGrey, red, white} from '../../themes/colors';

interface ActivityDetailsActionsProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  setExpensesIndex: (value: number) => void;
}

const ActivityDetailsActions = ({
  visible,
  setVisible,
  setExpensesIndex,
}: ActivityDetailsActionsProps) => {
  const {navigate} = useNavigation();

  const filter = (
    <ListItem key={0} containerStyle={styles.filterOptionsItem}>
      <ListItem.Content>
        <Text
          onPress={() => {
            setExpensesIndex(ExpensesFilter.CURRENT_USER);
            setVisible(false);
          }}
          style={styles.filterContent}>
          Me
        </Text>
      </ListItem.Content>
      <ListItem.Content>
        <Text
          onPress={() => {
            setExpensesIndex(ExpensesFilter.OTHER_USER);
            setVisible(false);
          }}
          style={styles.filterContent}>
          Other
        </Text>
      </ListItem.Content>
      <ListItem.Content>
        <Text
          onPress={() => {
            setExpensesIndex(ExpensesFilter.NO);
            setVisible(false);
          }}
          style={styles.filterContent}>
          No
        </Text>
      </ListItem.Content>
    </ListItem>
  );

  const addExpense = (
    <ListItem
      key={1}
      onPress={() => {
        setVisible(false);
        navigate(Pages.ADD_EXPENSE);
      }}
      containerStyle={styles.actionItems}>
      <ListItem.Content>
        <ListItem.Title>Add expense</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  const updateActivity = (
    <ListItem
      key={2}
      onPress={() => {
        setVisible(false);
        navigate(Pages.ACTIVITY_DETAILS);
      }}
      containerStyle={styles.actionItems}>
      <ListItem.Content>
        <ListItem.Title>Go to activity details</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  const back = (
    <ListItem
      key={3}
      onPress={() => setVisible(false)}
      containerStyle={styles.back}>
      <ListItem.Content>
        <ListItem.Title style={styles.backText}>Back</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  const actions = [filter, addExpense, updateActivity, back];

  return (
    <>
      <BottomSheet isVisible={visible}>{actions}</BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  actionItems: {
    backgroundColor: lightGrey,
  },
  back: {
    backgroundColor: red,
  },
  backText: {
    color: white,
  },
  filterContent: {
    color: white,
  },
  filterOptionsItem: {
    backgroundColor: blue,
  },
});

export default memo(ActivityDetailsActions);
