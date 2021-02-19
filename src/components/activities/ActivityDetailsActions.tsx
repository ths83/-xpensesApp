import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {BottomSheet, ListItem, Text} from 'react-native-elements';
import {ExpensesFilter} from '../../enums/ExpensesFilter';
import {Pages} from '../../enums/Pages';

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
    <ListItem key={0}>
      <ListItem.Content>
        <Text
          onPress={() => {
            setExpensesIndex(ExpensesFilter.CURRENT_USER);
            setVisible(false);
          }}>
          Me
        </Text>
      </ListItem.Content>
      <ListItem.Content>
        <Text
          onPress={() => {
            setExpensesIndex(ExpensesFilter.OTHER_USER);
            setVisible(false);
          }}>
          Other
        </Text>
      </ListItem.Content>
      <ListItem.Content>
        <Text
          onPress={() => {
            setExpensesIndex(ExpensesFilter.NO);
            setVisible(false);
          }}>
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
      }}>
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
      }}>
      <ListItem.Content>
        <ListItem.Title>Update activity</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  const cancel = (
    <ListItem key={3} onPress={() => setVisible(false)}>
      <ListItem.Content>
        <ListItem.Title>Cancel</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  const actions = [filter, addExpense, updateActivity, cancel];

  return (
    <>
      <BottomSheet isVisible={visible}>{actions}</BottomSheet>
    </>
  );
};

export default memo(ActivityDetailsActions);
