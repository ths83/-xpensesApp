import React, {memo} from 'react';
import {ListItem} from 'react-native-elements';
import {Expense} from '../../model/Expense';

interface ExpenseDetailsProps {
  expense: Expense;
}

const ExpenseDetails = ({expense}: ExpenseDetailsProps) => {
  return (
    <>
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
    </>
  );
};

export default memo(ExpenseDetails);
