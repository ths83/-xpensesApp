import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React from 'react';
import {ListItem} from 'react-native-elements';
import ExpenseDetails from '../../components/expenses/ExpenseDetails';
import {Pages} from '../../enums/Pages';
import {Expense} from '../../model/Expense';
import expenseAtom from '../../state/expense';

interface ExpensesViewProps {
  expenses: Expense[];
}

const ExpensesView = ({expenses}: ExpensesViewProps) => {
  const [, setExpense] = useAtom(expenseAtom);

  const {navigate} = useNavigation();

  return (
    <>
      {expenses.map((expense, i) => (
        <ListItem
          key={i}
          bottomDivider
          onPress={() => {
            setExpense(expenses[i]);
            navigate(Pages.EXPENSE_DETAILS);
          }}>
          <ExpenseDetails expense={expense} />
        </ListItem>
      ))}
    </>
  );
};

export default ExpensesView;
