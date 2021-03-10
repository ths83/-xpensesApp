import {useAtom} from 'jotai';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {BottomSheet, ButtonGroup, ListItem, Text} from 'react-native-elements';
import {FIRST_USER, SECOND_USER} from '../../config/UsersConfiguration';
import {ExpensesFilterIndex} from '../../enums/ExpensesFilterIndex';
import userAtom from '../../state/User';
import {black, blue, lightGrey, red, white} from '../../themes/colors';

interface ExpensesActionsFilterProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  index: ExpensesFilterIndex;
  setIndex: (value: ExpensesFilterIndex) => void;
}

const ExpensesActionsFilter = ({
  visible,
  setVisible,
  index,
  setIndex,
}: ExpensesActionsFilterProps) => {
  const [username] = useAtom(userAtom);

  const description = (
    <ListItem key={0} containerStyle={styles.buttonItem}>
      <ListItem.Content style={styles.buttonItemContent}>
        <Text style={styles.buttonItemContentTitle}>Filter expenses</Text>
      </ListItem.Content>
    </ListItem>
  );

  const updateIndex = (selectedIndex: ExpensesFilterIndex) =>
    setIndex(selectedIndex);

  const No = () => (
    <Text
      onPress={() => {
        setIndex(ExpensesFilterIndex.NO);
      }}>
      No
    </Text>
  );

  const OtherUser = () => (
    <Text
      onPress={() => {
        setIndex(ExpensesFilterIndex.OTHER_USER);
      }}>
      {username !== FIRST_USER ? FIRST_USER : SECOND_USER}
    </Text>
  );

  const CurrentUser = () => (
    <Text
      onPress={() => {
        setIndex(ExpensesFilterIndex.CURRENT_USER);
      }}>
      {username === FIRST_USER ? FIRST_USER : SECOND_USER}
    </Text>
  );

  const filter = (
    <ListItem key={1} containerStyle={styles.buttonItem}>
      <ListItem.Content style={styles.buttonItemContent}>
        <ButtonGroup
          buttonStyle={styles.buttons}
          selectedButtonStyle={styles.selectedButton}
          buttons={[
            {
              element: () => <No />,
            },
            {
              element: () => <OtherUser />,
            },
            {
              element: () => <CurrentUser />,
            },
          ]}
          onPress={updateIndex.bind(this)}
          selectedIndex={index}
        />
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

  const actions = [description, filter, back];

  return <BottomSheet isVisible={visible}>{actions}</BottomSheet>;
};

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: lightGrey,
  },
  selectedButton: {
    backgroundColor: blue,
  },
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
