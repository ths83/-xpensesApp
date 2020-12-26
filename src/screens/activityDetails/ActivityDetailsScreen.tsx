import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Activity from '../../model/Activity';
import Expense from '../../model/Expense';
import {getActivityById} from '../../api/ActivityService';
import {getExpenseById} from '../../api/ExpenseService';
import ActivityDetailsHeader from './components/ActivityDetailsHeader';
import ActivityDetailsTab from './components/ActivityDetailsTab';
import ActivityDetailsBottom from './components/ActivityDetailsBottom';
import ExpensesView from './views/ExpensesView';
import ExpensesBalanceView from './views/ExpensesBalanceView';

const ActivityDetailsScreen = (route) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  const [selectedExpenses, setSelectedExpenses] = useState<Expense[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<number>(0);

  useEffect(() => {
    callGetActivity();
  }, [tabIndex]);

  async function callGetActivity() {
    const {activityId} = route.navigation.state.params;
    getActivityById(activityId)
      .then((a) => {
        const activity = new Activity(
          a.id,
          a.name,
          a.createdBy,
          a.expenses,
          a.activityStatus,
          a.usersStatus,
          a.date,
        );
        setSelectedActivity(activity);
        extractExpenses(activity);
        extractUsers(activity);
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

  function extractUsers(activity: Activity) {
    if (
      activity.usersStatus === undefined ||
      activity.usersStatus.length === 0
    ) {
      setSelectedUsers([]);
    } else if (activity.usersStatus.length === 1) {
      setSelectedUsers([activity.usersStatus[0].split('/')[0]]);
    } else {
      setSelectedUsers([
        activity.usersStatus[0].split('/')[0],
        activity.usersStatus[1].split('/')[0],
      ]);
    }
  }

  return (
    <>
      <View>
        <ActivityDetailsHeader activityName={selectedActivity?.name} />
        <ActivityDetailsTab index={tabIndex} setIndex={setTabIndex} />
      </View>
      <ScrollView>
        {tabIndex === 0 ? (
          <ExpensesView expenses={selectedExpenses} />
        ) : (
          <ExpensesBalanceView
            expenses={selectedExpenses}
            users={selectedUsers}
          />
        )}
      </ScrollView>
      <ActivityDetailsBottom
        expenses={selectedExpenses}
        active={selectedActivity?.activityStatus === 'IN_PROGRESS'}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export default ActivityDetailsScreen;
