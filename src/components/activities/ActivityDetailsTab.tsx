import React, {memo} from 'react';
import {ButtonGroup, Text} from 'react-native-elements';
import {ExpensesTabIndex} from '../../enums/ExpensesTabIndex';

interface ActivityDetailsTabProps {
  index: ExpensesTabIndex;
  setIndex: (value: ExpensesTabIndex) => void;
}

const ActivityDetailsTab = ({index, setIndex}: ActivityDetailsTabProps) => {
  const updateIndex = (selectedIndex: ExpensesTabIndex) =>
    setIndex(selectedIndex);

  return (
    <ButtonGroup
      buttons={[
        {element: () => <Text>Expenses</Text>},
        {element: () => <Text>Balance</Text>},
      ]}
      onPress={updateIndex.bind(this)}
      selectedIndex={index}
    />
  );
};

export default memo(ActivityDetailsTab);
