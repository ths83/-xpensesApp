import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {ACTIVITY_API} from '../../api/ActivityApi';
import {Pages} from '../../enums/Pages';
import {EMPTY_EXPENSE} from '../../model/Expense';
import activityAtom from '../../state/Activity';
import expenseAtom from '../../state/expenses/Expense';

const ExpenseDetailsPage = () => {
  const [expense, setExpense] = useAtom(expenseAtom);
  const [activity] = useAtom(activityAtom);

  const {navigate, goBack} = useNavigation();

  function deleteExpense() {
    ACTIVITY_API.deleteExpense(activity.id, expense.id).then(() => {
      setExpense(EMPTY_EXPENSE);
      navigate(Pages.EXPENSES);
    });
  }

  return (
    <>
      <View>
        <Text h3>
          {/* name is a restricted field from AWS dynamoDB
           has been changed later in the api by expenseName
           migration is not completed for every expense
           */}
          {expense.expenseName === undefined
            ? expense.name
            : expense.expenseName}
        </Text>
        <Text>
          Added the {expense.date} by {expense.user}
        </Text>
        <Text>
          Amount : {expense.amount} {expense.currency}
        </Text>
      </View>
      <View>
        <Button title={'Delete'} onPress={deleteExpense} />
        <Button title={'Back'} onPress={goBack} />
      </View>
    </>
  );
};

export default ExpenseDetailsPage;
