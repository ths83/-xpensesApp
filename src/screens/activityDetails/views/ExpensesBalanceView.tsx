import React from 'react';
import {Text} from 'react-native-elements';
import Expense from '../../../model/Expense';

export default class ExpensesBalanceView extends React.Component<{
  expenses: Expense[];
  users: string[];
}> {
  render() {
    let firstUserTotalAmount = 0;
    let secondUserTotalAmount = 0;
    this.props.expenses.map((expense) => {
      if (expense.userId === this.props.users[0]) {
        firstUserTotalAmount += expense.amount;
      } else if (expense.userId === this.props.users[1]) {
        secondUserTotalAmount += expense.amount;
      }
    });

    if (firstUserTotalAmount === secondUserTotalAmount) {
      return <Text>Everything is fine !</Text>;
    } else if (firstUserTotalAmount > secondUserTotalAmount) {
      return (
        <Text>
          {this.props.users[1]} owes {secondUserTotalAmount / 2} CAD to{' '}
          {this.props.users[0]}
        </Text>
      );
    } else {
      return (
        <Text>
          {this.props.users[0]} owes {secondUserTotalAmount / 2} CAD to{' '}
          {this.props.users[1]}
        </Text>
      );
    }
  }
}
