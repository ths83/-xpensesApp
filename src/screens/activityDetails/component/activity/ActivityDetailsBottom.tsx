import React, {useState} from 'react';
import {Button, Header, Text} from 'react-native-elements';

import ActivityDetailsActions from './ActivityDetailsActions';
import Expense from '../../../../model/Expense';
import Activity from '../../../../model/Activity';
import {TEST_USER} from '../../../../config/UsersConfiguration';

interface ActivityDetailsBottomInterface {
  expenses: Expense[];
  activity: Activity;
  active: boolean;
}

const ActivityDetailsBottom = ({
  expenses,
  activity,
  active,
}: ActivityDetailsBottomInterface) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <Header
      leftComponent={renderLeft()}
      centerComponent={renderCenter()}
      rightComponent={renderRight()}
    />
  );

  function renderLeft() {
    let userTotal = 0;
    expenses.map((expense: Expense) => {
      // TODO change by current user
      if (expense.userId === TEST_USER) {
        userTotal += expense.amount;
      }
    });
    return (
      <>
        <Text>My total</Text>
        <Text>{userTotal}</Text>
      </>
    );
  }

  function renderRight() {
    let total = 0;
    expenses.map((expense: Expense) => {
      total += expense.amount;
    });
    return (
      <>
        <Text>Total</Text>
        <Text>{total}</Text>
      </>
    );
  }

  // TODO resolve icon issue
  function renderCenter() {
    return (
      active && (
        <>
          <Button
            onPress={() => setVisible(true)}
            icon={{
              name: 'arrow-right',
              size: 10,
              color: 'white',
            }}
          />
          <ActivityDetailsActions
            activity={activity}
            active={visible}
            setActive={setVisible}
          />
        </>
      )
    );
  }
};

export default ActivityDetailsBottom;
