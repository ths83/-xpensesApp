import {useNavigation, useRoute} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {expenseAtom} from '../../../App';
import {ACTIVITY_API} from '../../api/ActivityApi';
import {Pages} from '../../enums/Pages';
import {EMPTY_EXPENSE} from '../../model/Expense';

const ExpenseDetailsPage = () => {
  const [expense, setExpense] = useAtom(expenseAtom);

  const {navigate} = useNavigation();

  const {params} = useRoute();
  const {activityId} = params;

  function deleteExpense() {
    ACTIVITY_API.deleteExpense(activityId, expense.id)
      .then(() => {
        console.debug(
          `Successfully deleted expense '${expense.id}' from activity '${activityId}'`,
        );
        setExpense(EMPTY_EXPENSE);
        navigate(Pages.ACTIVITY_DETAILS);
      })
      .catch((error) =>
        console.debug(
          `An error occurred while deleting expense '${expense.id}' from activity '${activityId}'`,
          error,
        ),
      );
  }

  // TODO CSS
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
        <Button
          title={'Back'}
          onPress={() =>
            navigate(Pages.ACTIVITY_DETAILS, {activityId: activityId})
          }
        />
      </View>
    </>
  );
};

export default ExpenseDetailsPage;
