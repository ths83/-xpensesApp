import {useNavigation, useRoute} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {expenseAtom} from '../../../App';
import {delExpenseFromActivity} from '../../api/ActivityService';
import Expense from '../../model/Expense';

const ExpenseDetailsScreen = () => {
  const [expense, setExpense] = useAtom(expenseAtom);

  const {navigate} = useNavigation();

  const {params} = useRoute();

  const {activityId} = params;

  //TODO add expenseActions and all expense information

  function deleteExpense() {
    delExpenseFromActivity(activityId, expense.id)
      .then(() => {
        console.log(
          `Successfully deleted expense '${expense.id}' from activity '${activityId}'`,
        );
        setExpense(new Expense('', '', 0, '', '', ''));
        navigate('ActivityDetails');
      })
      .catch((error) =>
        console.log(
          `An error occurred while deleting expense '${expense.id}' from activity '${activityId}'`,
          error,
        ),
      );
  }

  return (
    <>
      <View>
        <Text h3>{expense.name}</Text>
        <Text>
          Added the {expense.date} by {expense.user}
        </Text>
        <Text>
          Amount : {expense.amount} {expense.currency}
        </Text>
      </View>
      <View>
        <Button title={'Delete'} onPress={deleteExpense} />
        <Button title={'Back'} onPress={() => navigate('ActivityDetails')} />
      </View>
    </>
  );
};

export default ExpenseDetailsScreen;
