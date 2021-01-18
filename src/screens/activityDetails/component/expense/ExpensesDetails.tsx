import {ListItem} from 'react-native-elements';
import React, {useState} from 'react';
import Expense from '../../../../model/Expense';
import ExpenseActions from './ExpenseActions';
import Activity from '../../../../model/Activity';

interface ExpensesDetailsInterface {
  activity: Activity;
  expenses: Expense[];
}

const ExpensesDetails = ({activity, expenses}: ExpensesDetailsInterface) => {
  const [actionVisible, setActionVisible] = useState<boolean>(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense>();

  return (
    <>
      {expenses.map((expense, i) => (
        <ListItem
          key={i}
          bottomDivider
          onPress={() => {
            setSelectedExpense(expense);
            setActionVisible(true);
          }}>
          <ListItem.Content>
            <ListItem.Title>{expense.name}</ListItem.Title>
            <ListItem.Subtitle>Paid by {expense.userId}</ListItem.Subtitle>
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
        activity={activity}
        expense={selectedExpense}
        isVisible={actionVisible}
        setVisible={setActionVisible}
      />
    </>
  );
};

export default ExpensesDetails;
