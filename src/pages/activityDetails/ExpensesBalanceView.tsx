import {useAtom} from 'jotai';
import React from 'react';
import {Text} from 'react-native-elements';
import {getUsers} from '../../config/UsersConfiguration';
import {Expense} from '../../model/Expense';
import expensesAtom from '../../state/expenses/Expenses';
import userAtom from '../../state/User';
import {formatAmount} from '../../utils/AmountFormatter';

const ExpensesBalanceView = () => {
  const [username] = useAtom(userAtom);
  const [expenses] = useAtom(expensesAtom);

  const users = getUsers(); //TODO remove for v2

  const sumAmounts = (expenses: Expense[]) =>
    expenses
      .map((expense) => expense.amount)
      .reduce((sum, current) => (sum += current));

  const render = () => {
    const currentUserAmount = sumAmounts(expenses.currentUser);
    const otherUserAmount = sumAmounts(expenses.otherUser);

    const otherUser = users.filter((user) => user != username);

    if (currentUserAmount === otherUserAmount) {
      return <Text>Everything is fine !</Text>;
    } else if (currentUserAmount > otherUserAmount) {
      return (
        <Text>
          {otherUser} owes{' '}
          {formatAmount((currentUserAmount - otherUserAmount) / 2)} CAD to{' '}
          {username}
        </Text>
      );
    } else {
      return (
        <Text>
          {username} owes{' '}
          {formatAmount((otherUserAmount - currentUserAmount) / 2)} CAD to{' '}
          {otherUser}
        </Text>
      );
    }
  };

  return render();
};

export default ExpensesBalanceView;
