import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import Activity from '../../model/Activity';
import Expense from '../../model/Expense';
import {getActivityById} from '../../api/ActivityService';
import {getExpenseById} from '../../api/ExpenseService';
import ExpensesDetails from './components/ExpensesDetails';
import ActivityDetailsHeader from './components/ActivityDetailsHeader';
import ActivityDetailsButtonGroup from './components/ActivityDetailsButtonGroup';
import ActivityBottomHeader from './components/ActivityBottomHeader';

const ActivityDetailsScreen = (route) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  const [selectedExpenses, setSelectedExpenses] = useState<Expense[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    callGetActivity();
  }, []);

  async function callGetActivity() {
    const {activityId} = route.navigation.state.params;
    getActivityById(activityId)
      .then((a) => {
        const foundActivity = new Activity(
          a.id,
          a.name,
          a.createdBy,
          a.expenses,
          a.activityStatus,
          a.userStatus,
          a.date,
        );
        setSelectedActivity(foundActivity);
        extractExpenses(foundActivity);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getExpenses(expenses: Expense[]) {
    return expenses
      .sort((ex1, ex2) => {
        if (ex1.date > ex2.date) {
          return 1;
        }
        if (ex1.date < ex2.date) {
          return -1;
        }
        return 0;
      })
      .reverse();
  }

  async function extractExpenses(activity: Activity) {
    if (activity?.expenses === undefined || activity?.expenses.length === 0) {
      setSelectedExpenses([]);
    } else {
      Promise.all(
        activity?.expenses.map((expenseId) => getExpenseById(expenseId)),
      ).then((response) => {
        const mappedExpenses = response.map((ex: any) => {
          return new Expense(
            ex.id,
            ex.userId,
            ex.amount,
            ex.currency,
            ex.date,
            ex.name,
          );
        });
        setSelectedExpenses(getExpenses(mappedExpenses));
      });
    }
  }

  return (
    <>
      <View>
        <ActivityDetailsHeader activityName={selectedActivity?.name} />
        <ActivityDetailsButtonGroup />
      </View>
      <ScrollView>
        {selectedExpenses.length === 0 ? (
          <Text>No expenses found</Text>
        ) : (
          <ExpensesDetails expenses={selectedExpenses} />
        )}
      </ScrollView>
      <ActivityBottomHeader
        expenses={selectedExpenses}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export default ActivityDetailsScreen;
