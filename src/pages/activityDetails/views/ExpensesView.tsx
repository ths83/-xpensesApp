import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React from 'react';
import {ListItem} from 'react-native-elements';
import {expenseAtom} from '../../../../App';
import {Pages} from '../../../commons/enums/Pages';
import Expense from '../../../model/Expense';

interface ExpensesViewProps {
  activityId: string;
  expenses: Expense[];
}

const ExpensesView = ({activityId, expenses}: ExpensesViewProps) => {
  const [, setExpense] = useAtom<Expense>(expenseAtom);

  const {navigate} = useNavigation();

  return (
    <>
      {expenses.map((expense, i) => (
        <ListItem
          key={i}
          bottomDivider
          onPress={() => {
            setExpense(expenses[i]);
            navigate(Pages.EXPENSE_DETAILS, {
              activityId: activityId,
            });
          }}>
          <ListItem.Content>
            <ListItem.Title>{expense.name}</ListItem.Title>
            <ListItem.Subtitle>Paid by {expense.user}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Content right>
            <ListItem.Title>
              {expense.amount} {expense.currency}
            </ListItem.Title>
            <ListItem.Subtitle>{expense.date}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </>
  );
};

export default ExpensesView;
