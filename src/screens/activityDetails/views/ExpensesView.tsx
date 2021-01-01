import React from 'react';
import Expense from '../../../model/Expense';
import {Text} from 'react-native-elements';
import ExpensesDetails from '../component/expense/ExpensesDetails';
import Activity from '../../../model/Activity';

interface ExpensesViewInterface {
  activity: Activity;
  expenses: Expense[];
}

const ExpensesView = ({activity, expenses}: ExpensesViewInterface) => {
  return expenses.length === 0 ? (
    <Text>No expenses found</Text>
  ) : (
    <ExpensesDetails activity={activity} expenses={expenses} />
  );
};

export default ExpensesView;
