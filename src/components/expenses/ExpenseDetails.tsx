import React, {memo} from 'react';
import {ListItem} from 'react-native-elements';
import {Expense} from '../../model/Expense';
import {formatAmount} from '../../utils/AmountFormatter';

interface ExpenseDetailsProps {
  expense: Expense;
}

const ExpenseDetails = ({expense}: ExpenseDetailsProps) => {
  return (
    <>
      <ListItem.Content>
        <ListItem.Title>{expense.expenseName}</ListItem.Title>
        <ListItem.Subtitle>Paid by {expense.user}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content right>
        <ListItem.Title>
          {formatAmount(expense.amount)} {expense.currency}
        </ListItem.Title>
        <ListItem.Subtitle>{expense.startDate}</ListItem.Subtitle>
      </ListItem.Content>
    </>
  );
};

export default memo(ExpenseDetails);
