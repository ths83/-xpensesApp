import React from 'react';
import Expense from '../../../model/Expense';
import {Text} from 'react-native-elements';
import ExpensesDetails from '../components/ExpensesDetails';

export default class ExpensesView extends React.Component<{
  expenses: Expense[];
}> {
  render() {
    return this.props.expenses.length === 0 ? (
      <Text>No expenses found</Text>
    ) : (
      <ExpensesDetails expenses={this.props.expenses} />
    );
  }
}
