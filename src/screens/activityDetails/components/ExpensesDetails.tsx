import {ListItem} from 'react-native-elements';
import React from 'react';
import Expense from '../../../model/Expense';

export default class ExpensesDetails extends React.Component<{
  expenses: Expense[];
}> {
  render() {
    return this.props.expenses.map((expense, i) => expenseDetails(expense, i));
  }
}

function expenseDetails(expense, index) {
  return (
    <ListItem key={index} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{expense.name}</ListItem.Title>
        <ListItem.Subtitle>Paid by {expense.userId}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content right>
        <ListItem.Title>
          {expense.amount} {expense.currency}
        </ListItem.Title>
        <ListItem.Subtitle>{expense.date}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}
