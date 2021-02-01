import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Header, Icon, Text} from 'react-native-elements';
import {Pages} from '../../../commons/enums/Pages';
import Expense from '../../../model/Expense';

interface ActivityDetailsBottomProps {
  activityId: string;
  expenses: Expense[];
  username: string;
}

const ActivityDetailsBottom = ({
  activityId,
  expenses,
  username,
}: ActivityDetailsBottomProps) => {
  const {navigate} = useNavigation();

  const renderTotalUserExpense = () => {
    let userTotal = 0;
    expenses.map((expense: Expense) => {
      if (expense.user === username) {
        userTotal += expense.amount;
      }
    });
    return (
      <>
        <Text>My total</Text>
        <Text>{userTotal}</Text>
      </>
    );
  };

  const renderTotalExpense = () => {
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
  };

  const addExpense = () => {
    return (
      <>
        <Icon
          name="add"
          onPress={() => {
            navigate(Pages.ADD_EXPENSE, {activityId: activityId});
          }}
        />
      </>
    );
  };

  return (
    <Header
      leftComponent={renderTotalUserExpense()}
      centerComponent={addExpense()}
      rightComponent={renderTotalExpense()}
    />
  );
};

export default ActivityDetailsBottom;
