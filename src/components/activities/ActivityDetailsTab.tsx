import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {ButtonGroup, Text} from 'react-native-elements';
import {ExpensesTabIndex} from '../../enums/ExpensesTabIndex';
import {blue, lightGrey} from '../../themes/colors';

interface ActivityDetailsTabProps {
  index: ExpensesTabIndex;
  setIndex: (value: ExpensesTabIndex) => void;
}

const ActivityDetailsTab = ({index, setIndex}: ActivityDetailsTabProps) => {
  const updateIndex = (selectedIndex: ExpensesTabIndex) =>
    setIndex(selectedIndex);

  return (
    <ButtonGroup
      buttonStyle={styles.lightGrey}
      selectedButtonStyle={styles.blue}
      buttons={[
        {element: () => <Text>Expenses</Text>},
        {element: () => <Text>Balance</Text>},
      ]}
      onPress={updateIndex.bind(this)}
      selectedIndex={index}
    />
  );
};

const styles = StyleSheet.create({
  lightGrey: {
    backgroundColor: lightGrey,
  },
  blue: {
    backgroundColor: blue,
  },
});

export default memo(ActivityDetailsTab);
