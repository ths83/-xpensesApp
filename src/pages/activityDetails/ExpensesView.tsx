import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React from 'react';
import {ListItem} from 'react-native-elements';
import ExpenseDetails from '../../components/expenses/ExpenseDetails';
import {ExpensesFilter} from '../../enums/ExpensesFilter';
import {Pages} from '../../enums/Pages';
import {Expense} from '../../model/Expense';
import expenseAtom from '../../state/expenses/Expense';
import expensesAtom from '../../state/expenses/Expenses';

interface ExpensesViewProps {
  index: number;
}

const ExpensesView = ({index}: ExpensesViewProps) => {
  const [expenses] = useAtom(expensesAtom);
  const [, setExpense] = useAtom(expenseAtom);

  const {navigate} = useNavigation();

  const selectedExpenses = (): Expense[] => {
    if (index === ExpensesFilter.NO) {
      return expenses.all;
    } else if (index === ExpensesFilter.CURRENT_USER) {
      return expenses.currentUser;
    } else {
      return expenses.otherUser;
    }
  };

  return (
    <>
      {selectedExpenses().map((expense, i) => (
        <ListItem
          key={i}
          bottomDivider
          onPress={() => {
            setExpense(expense);
            navigate(Pages.EXPENSE_DETAILS);
          }}>
          <ExpenseDetails expense={expense} />
        </ListItem>
      ))}
    </>
  );
};

export default ExpensesView;
