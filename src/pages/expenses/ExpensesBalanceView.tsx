import {useAtom} from 'jotai';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {getUsers} from '../../config/UsersConfiguration';
import {Expense} from '../../model/Expense';
import expensesAtom from '../../state/Expenses';
import userAtom from '../../state/User';
import {dollar} from '../../themes/colors';
import {iMedium} from '../../themes/icons';
import {sNormal} from '../../themes/size';
import {formatAmount} from '../../utils/AmountFormatter';

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

    const otherUser = users.filter((user) => user !== username)[0];

    let debtOwner = username;
    let debtReceiver = otherUser;
    let ownerAmount = currentUserAmount;
    let receiverAmount = otherUserAmount;

    if (ownerAmount > receiverAmount) {
      debtOwner = otherUser;
      debtReceiver = username;
      ownerAmount = otherUserAmount;
      receiverAmount = currentUserAmount;
    }

    if (ownerAmount === receiverAmount) {
      return (
        <View style={styles.container}>
          <Text h4>Everything is fine !</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text h4>
            {debtOwner} owes {debtReceiver}
          </Text>
          <View style={styles.textIcon}>
            <Icon
              name="money-bill"
              type="font-awesome-5"
              size={iMedium}
              color={dollar}
            />
            <Text h4>
              {formatAmount((receiverAmount - ownerAmount) / 2)} CAD
            </Text>
          </View>
        </View>
      );
    }
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textIcon: {
    alignItems: 'center',
    marginTop: sNormal,
  },
});

export default ExpensesBalanceView;
