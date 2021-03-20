import {useAtom} from 'jotai';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Icon, ListItem, Text} from 'react-native-elements';
import {Expense} from '../../model/Expense';
import userAtom from '../../state/User';
import {black, blue, darkGreen, green} from '../../themes/colors';
import {iSmall} from '../../themes/icons';
import {formatAmount} from '../../utils/AmountFormatter';

interface ExpenseDetailsProps {
  expense: Expense;
}

const ExpenseDetails = ({expense}: ExpenseDetailsProps) => {
  const [username] = useAtom(userAtom);

  return (
    <>
      <ListItem.Content>
        <ListItem.Title>{expense.expenseName}</ListItem.Title>
        <ListItem.Subtitle>
          <Icon
            name="user"
            type="font-awesome-5"
            size={iSmall}
            color={username === expense.user ? green : black}
          />
          <Text style={styles.darkGreen}>
            {' '}
            {username === expense.user ? 'Me' : expense.user}
          </Text>
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content right>
        <ListItem.Title style={styles.blue}>
          {formatAmount(expense.amount)} {expense.currency}
        </ListItem.Title>
        <ListItem.Subtitle style={styles.italic}>
          {expense.startDate}
        </ListItem.Subtitle>
      </ListItem.Content>
    </>
  );
};

const styles = StyleSheet.create({
  darkGreen: {
    color: darkGreen,
  },
  blue: {
    color: blue,
  },
  italic: {
    fontStyle: 'italic',
  },
});

export default memo(ExpenseDetails);
