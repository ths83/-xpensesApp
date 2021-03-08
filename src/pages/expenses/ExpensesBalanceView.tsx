import {useAtom} from 'jotai';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {getUsers} from '../../config/UsersConfiguration';
import {Expense} from '../../model/Expense';
import expensesAtom from '../../state/Expenses';
import userAtom from '../../state/User';
import {formatAmount} from '../../utils/AmountFormatter';

const ExpensesBalanceView = () => {
  const [username] = useAtom(userAtom);
  const [expenses] = useAtom(expensesAtom);

  const users = getUsers();

  const sumAmounts = (expenses: Expense[]) =>
    expenses
      .map((expense) => expense.amount)
      .reduce((sum, current) => (sum += current));

  const render = () => {
    const currentUserAmount = sumAmounts(expenses.currentUser);
    const otherUserAmount = sumAmounts(expenses.otherUser);

    const otherUser = users.filter((user) => user !== username);

    if (currentUserAmount === otherUserAmount) {
      return <Text style={styles.text}>Everything is fine !</Text>;
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

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});

export default ExpensesBalanceView;
