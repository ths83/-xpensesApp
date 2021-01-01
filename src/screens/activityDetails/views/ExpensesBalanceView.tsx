import React from 'react';
import {Text} from 'react-native-elements';
import Expense from '../../../model/Expense';

interface ExpensesBalanceViewInterface {
  expenses: Expense[];
  users: string[];
}

const ExpensesBalanceView = ({
  expenses,
  users,
}: ExpensesBalanceViewInterface) => {
  return render();

  function render() {
    let firstUserTotalAmount = 0;
    let secondUserTotalAmount = 0;

    expenses.map((expense: Expense) => {
      if (expense.userId === users[0]) {
        firstUserTotalAmount += expense.amount;
      } else if (expense.userId === users[1]) {
        secondUserTotalAmount += expense.amount;
      }
    });

    if (firstUserTotalAmount === secondUserTotalAmount) {
      return <Text>Everything is fine !</Text>;
    } else if (firstUserTotalAmount > secondUserTotalAmount) {
      return (
        <Text>
          {users[1]} owes {secondUserTotalAmount / 2} CAD to {users[0]}
        </Text>
      );
    } else {
      return (
        <Text>
          {users[0]} owes {secondUserTotalAmount / 2} CAD to {users[1]}
        </Text>
      );
    }
  }
};

export default ExpensesBalanceView;
