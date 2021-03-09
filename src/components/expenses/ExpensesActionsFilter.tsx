import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {BottomSheet, ListItem, Text} from 'react-native-elements';
import {ExpensesFilter} from '../../enums/ExpensesFilter';
import {black, red, white} from '../../themes/colors';

interface ExpensesActionsFilterProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  setExpensesIndex: (value: number) => void;
}

const ExpensesActionsFilter = ({
  visible,
  setVisible,
  setExpensesIndex,
}: ExpensesActionsFilterProps) => {
  const filter = (
    <ListItem key={0} containerStyle={styles.buttonItem}>
      <ListItem.Content style={styles.buttonItemContent}>
        <Text
          onPress={() => {
            setExpensesIndex(ExpensesFilter.CURRENT_USER);
            setVisible(false);
          }}
          style={styles.buttonItemContentTitle}>
          Me
        </Text>
      </ListItem.Content>
      <ListItem.Content style={styles.buttonItemContent}>
        <Text
          onPress={() => {
            setExpensesIndex(ExpensesFilter.OTHER_USER);
            setVisible(false);
          }}
          style={styles.buttonItemContentTitle}>
          Other
        </Text>
      </ListItem.Content>
      <ListItem.Content style={styles.buttonItemContent}>
        <Text
          onPress={() => {
            setExpensesIndex(ExpensesFilter.NO);
            setVisible(false);
          }}
          style={styles.buttonItemContentTitle}>
          No
        </Text>
      </ListItem.Content>
    </ListItem>
  );

  const back = (
    <ListItem
      key={1}
      onPress={() => setVisible(false)}
      containerStyle={styles.backButtonItem}>
      <ListItem.Content style={styles.buttonItemContent}>
        <ListItem.Title style={styles.buttonItemContentTitle}>
          Back
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  const actions = [filter, back];

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
    backgroundColor: black,
  },
});

export default memo(ExpensesActionsFilter);
