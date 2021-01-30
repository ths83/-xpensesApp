import React from 'react';
import {ButtonGroup, Text} from 'react-native-elements';

interface ActivityDetailsTabProps {
  index: number;
  setIndex: (value: number) => void;
}

const ActivityDetailsTab = ({index, setIndex}: ActivityDetailsTabProps) => {
  function updateIndex(selectedIndex: number) {
    setIndex(selectedIndex);
  }

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

export default ActivityDetailsTab;
