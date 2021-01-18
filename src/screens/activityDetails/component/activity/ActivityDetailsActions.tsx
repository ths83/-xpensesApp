import {Button, Overlay} from 'react-native-elements';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Activity from '../../../../model/Activity';

interface ActivityDetailsActions {
  activity: Activity;
  active: boolean;
  setActive: (value: ((prevState: boolean) => boolean) | boolean) => void;
}

const ActivityDetailsActions = ({
  activity,
  active,
  setActive,
}: ActivityDetailsActions) => {
  const navigation = useNavigation();

  return (
    <>
      <Overlay isVisible={active} onBackdropPress={() => setActive(false)}>
        <Button
          title="Add expense"
          onPress={() => {
            setActive(false);
            navigation.navigate('AddExpense', {
              activity: activity,
            });
          }}
        />
        <Button title="Close" onPress={() => setActive(false)} />
      </Overlay>
    </>
  );
};

export default ActivityDetailsActions;
