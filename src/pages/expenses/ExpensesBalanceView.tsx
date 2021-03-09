import {useAtom} from 'jotai';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {getUsers} from '../../config/UsersConfiguration';
import {Expense} from '../../model/Expense';
import expensesAtom from '../../state/Expenses';
import userAtom from '../../state/User';
import {formatAmount} from '../../utils/AmountFormatter';

//TODO optimize code here (+ center view)
const ExpensesBalanceView = () => {
  const [username] = useAtom(userAtom);
  const [expenses] = useAtom(expensesAtom);

  const users = getUsers();

  const sumAmounts = (expenses: Expense[]) =>
    expenses.length > 0
      ? expenses
          .map((expense) => expense.amount)
          .reduce((sum, current) => (sum += current))
      : 0;

  const render = () => {
    const currentUserAmount = sumAmounts(expenses.currentUser);
    const otherUserAmount = sumAmounts(expenses.otherUser);

    const otherUser = users.filter((user) => user !== username);

    if (currentUserAmount === otherUserAmount) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <Text h4 style={styles.text}>
            Everything is fine !
          </Text>
        </View>
      );
    } else if (currentUserAmount > otherUserAmount) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <Text h4 style={styles.text}>
            {otherUser} owes{' '}
            {formatAmount((currentUserAmount - otherUserAmount) / 2)} CAD to{' '}
            {username}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <Text h4 style={styles.text}>
            {username} owes{' '}
            {formatAmount((otherUserAmount - currentUserAmount) / 2)} CAD to{' '}
            {otherUser}
          </Text>
        </View>
      );
    }
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  text: {
    alignContent: 'center',
  },
});

export default ExpensesBalanceView;
