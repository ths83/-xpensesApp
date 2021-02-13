import {useAtom} from 'jotai';
import React from 'react';
import {Text} from 'react-native-elements';
import {getUsers} from '../../config/UsersConfiguration';
import {Expense} from '../../model/Expense';
import expensesAtom from '../../state/Expenses';

const ExpensesBalanceView = () => {
  const [expenses] = useAtom(expensesAtom);

  const users = getUsers(); //TODO remove for v2

  function render() {
    let firstUserTotalAmount = 0;
    let secondUserTotalAmount = 0;

    expenses.map((expense: Expense) => {
      if (expense.user === users[0]) {
        firstUserTotalAmount += expense.amount;
      } else if (expense.user === users[1]) {
        secondUserTotalAmount += expense.amount;
      }
    });

    if (firstUserTotalAmount === secondUserTotalAmount) {
      return <Text>Everything is fine !</Text>;
    } else if (firstUserTotalAmount > secondUserTotalAmount) {
      return (
        <Text>
          {users[1]} owes {firstUserTotalAmount / 2} CAD to {users[0]}
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

  return render();
};

export default ExpensesBalanceView;
