import React from 'react';
import {Button, Overlay} from 'react-native-elements';
import Expense from '../../../../model/Expense';
import {delExpenseFromActivity} from '../../../../api/ActivityService';
import Activity from '../../../../model/Activity';

interface ExpenseActionsInterface {
  activity: Activity;
  expense: Expense;
  isVisible: boolean;
  setVisible: (value: ((prevState: boolean) => boolean) | boolean) => void;
}

const ExpenseActions = ({
  activity,
  expense,
  isVisible,
  setVisible,
}: ExpenseActionsInterface) => {
  function deleteExpense() {
    delExpenseFromActivity(activity.id, expense.id)
      .then(() =>
        console.log(
          `Successfully deleted expense ${expense.id} from activity ${activity.id}`,
        ),
      )
      .catch((error) =>
        console.log(
          `An error occurred while deleting expense ${expense.id} from activity ${activity.id}`,
          error,
        ),
      );
  }

  return (
    <>
      <Overlay isVisible={isVisible} onBackdropPress={() => setVisible(false)}>
        <Button
          title="Delete expense"
          onPress={() => {
            deleteExpense();
            setVisible(false);
          }}
        />
        <Button title="Close" onPress={() => setVisible(false)} />
      </Overlay>
    </>
  );
};

export default ExpenseActions;
