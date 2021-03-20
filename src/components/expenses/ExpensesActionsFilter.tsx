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
    <ListItem key={0} containerStyle={styles.black}>
      <ListItem.Content style={styles.center}>
        <Text style={styles.white}>Filter expenses</Text>
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
      Me
    </Text>
  );

  const filter = (
    <ListItem key={1} containerStyle={styles.black}>
      <ListItem.Content style={styles.center}>
        <ButtonGroup
          buttonStyle={styles.lightGrey}
          selectedButtonStyle={styles.blue}
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
      containerStyle={styles.red}>
      <ListItem.Content style={styles.center}>
        <ListItem.Title style={styles.white}>Back</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  const actions = [description, filter, back];

  return <BottomSheet isVisible={visible}>{actions}</BottomSheet>;
};

const styles = StyleSheet.create({
  lightGrey: {
    backgroundColor: lightGrey,
  },
  blue: {
    backgroundColor: blue,
  },
  red: {
    backgroundColor: red,
  },
  center: {
    alignItems: 'center',
  },
  white: {
    color: white,
  },
  black: {
    backgroundColor: black,
  },
});

export default memo(ExpensesActionsFilter);
