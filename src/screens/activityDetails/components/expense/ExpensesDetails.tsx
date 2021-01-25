import {ListItem} from 'react-native-elements';
import React, {useState} from 'react';
import Expense from '../../../../model/Expense';
import ExpenseActions from './ExpenseActions';
import {activityAtom} from '../../../../../App';

interface Props {
  expenses: Expense[];
}

const ExpensesDetails = ({expenses}: Props) => {
  const [actionVisible, setActionVisible] = useState<boolean>(false);
  const [expense, setExpense] = useState<Expense>();

  return (
    <>
      {expenses.map((expense, i) => (
        <ListItem
          key={i}
          bottomDivider
          onPress={() => {
            setExpense(expense);
            setActionVisible(true);
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
      <ExpenseActions
        expenseId={expense?.id}
        isVisible={actionVisible}
        setVisible={setActionVisible}
      />
    </>
  );
};

export default ExpensesDetails;
