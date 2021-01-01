import React from 'react';
import Expense from '../../../model/Expense';
import {Text} from 'react-native-elements';
import ExpensesDetails from '../component/expense/ExpensesDetails';

interface ExpensesViewInterface {
  expenses: Expense[];
}

const ExpensesView = ({expenses}: ExpensesViewInterface) => {
  return expenses.length === 0 ? (
    <Text>No expenses found</Text>
  ) : (
    <ExpensesDetails expenses={expenses} />
  );
};

export default ExpensesView;
