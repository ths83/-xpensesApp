import React from 'react';
import {Button, Header, Text} from 'react-native-elements';
import Expense from '../../../../model/Expense';
import {TEST_USER} from '../../../../config/UsersConfiguration';
import {useNavigation} from '@react-navigation/native';

interface Props {
  expenses: Expense[];
}

const ActivityDetailsBottom = ({expenses}: Props) => {
  const {navigate} = useNavigation();

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
      <>
        <Button
          onPress={() => {
            navigate('AddExpense');
          }}
          icon={{
            name: 'arrow-right',
            size: 10,
            color: 'white',
          }}
        />
      </>
    );
  }
};

export default ActivityDetailsBottom;
