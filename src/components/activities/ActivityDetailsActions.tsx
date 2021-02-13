import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {BottomSheet, ListItem} from 'react-native-elements';
import {Pages} from '../../enums/Pages';

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
    <ListItem key={0} onPress={() => navigate(Pages.ADD_EXPENSE)}>
      <ListItem.Content>
        <ListItem.Title>Add expense</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  const deleteActivity = (
    <ListItem key={1}>
      <ListItem.Content>
        <ListItem.Title>Delete</ListItem.Title>
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

  const actions = [addExpense, deleteActivity, cancel];

  return (
    <BottomSheet
      isVisible={visible}
      containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
      {actions}
    </BottomSheet>
  );
};

export default memo(ActivityDetailsActions);
