import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React from 'react';
import {ListItem} from 'react-native-elements';
import ExpenseDetails from '../../components/expenses/ExpenseDetails';
import {ExpensesFilterIndex} from '../../enums/ExpensesFilterIndex';
import {Pages} from '../../enums/Pages';
import {Expense} from '../../model/Expense';
import expensesAtom from '../../state/Expenses';

interface ExpensesViewProps {
  index: number;
}

const ExpensesView = ({index}: ExpensesViewProps) => {
  const [expenses] = useAtom(expensesAtom);

  const {navigate} = useNavigation();

  const selectedExpenses = (): Expense[] => {
    if (index === ExpensesFilterIndex.NO) {
      return expenses.all;
    } else if (index === ExpensesFilterIndex.CURRENT_USER) {
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
          onPress={() =>
            navigate(Pages.EXPENSE_DETAILS, {
              expense: expense,
            })
          }>
          <ExpenseDetails expense={expense} />
        </ListItem>
      ))}
    </>
  );
};

export default ExpensesView;
