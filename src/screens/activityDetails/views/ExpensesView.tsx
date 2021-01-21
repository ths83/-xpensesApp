import React from 'react';
import Expense from '../../../model/Expense';
import {Text} from 'react-native-elements';
import ExpensesDetails from '../components/expense/ExpensesDetails';

interface Props {
  expenses: Expense[];
}

const ExpensesView = ({expenses}: Props) => {
  return expenses.length === 0 ? (
    <Text>No expenses found</Text>
  ) : (
    <ExpensesDetails expenses={expenses} />
  );
};

export default ExpensesView;
