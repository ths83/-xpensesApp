import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React from 'react';
import {ListItem} from 'react-native-elements';
import {expenseAtom} from '../../../../App';
import {Pages} from '../../../commons/enums/Pages';
import Expense from '../../../model/Expense';
import PureExpenseDetails from '../components/ExpenseDetails';

interface ExpensesViewProps {
  activityId: string;
  expenses: Expense[];
}

const ExpensesView = ({activityId, expenses}: ExpensesViewProps) => {
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
            navigate(Pages.EXPENSE_DETAILS, {activityId: activityId});
          }}>
          <PureExpenseDetails expense={expense} />
        </ListItem>
      ))}
    </>
  );
};
export default ExpensesView;
