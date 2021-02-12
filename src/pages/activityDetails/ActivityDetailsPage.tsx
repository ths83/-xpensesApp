import {useIsFocused} from '@react-navigation/core';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {ACTIVITY_API} from '../../api/ActivityApi';
import {EXPENSE_API} from '../../api/ExpenseApi';
import ActivityDetailsBottom from '../../components/activities/ActivityDetailsBottom';
import ActivityDetailsTab from '../../components/activities/ActivityDetailsTab';
import {Status} from '../../enums/Status';
import {Activity} from '../../model/Activity';
import {Expense} from '../../model/Expense';
import activityAtom from '../../state/activity';
import userAtom from '../../state/user';
import {toYYYY_MM_DD} from '../../utils/DateFormatter';
import ExpensesBalanceView from './ExpensesBalanceView';
import ExpensesView from './ExpensesView';

const ActivityDetailsPage = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [refreshing, setRefreshing] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [activity, setActivity] = useAtom<Activity>(activityAtom);
  const [username] = useAtom(userAtom);

  const isFocused = useIsFocused();

  useEffect(() => {
    fetchExpenses();
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchExpenses();
    setRefreshing(false);
  }, []);

  async function fetchActivity() {
    setStatus(Status.IN_PROGRESS);
    console.log({activity});
    ACTIVITY_API.getById(activity.id)
      .then((fetchedActivity) => setActivity(fetchedActivity))
      .catch(() => setStatus(Status.ERROR));
  }

  async function fetchExpenses() {
    fetchActivity();
    if (activity?.expenses === undefined || activity?.expenses?.length === 0) {
      setExpenses([]);
      setStatus(Status.SUCCESS);
    } else {
      EXPENSE_API.getByActivityId(activity.id)
        .then((fetchedExpenses) => {
          fetchedExpenses.map((fetchedExpense) => {
            fetchedExpense.date = toYYYY_MM_DD(fetchedExpense.date);
            return fetchedExpense;
          });
          setExpenses(fetchedExpenses);
          setStatus(Status.SUCCESS);
        })
        .catch(() => {
          setExpenses([]);
          setStatus(Status.ERROR);
        });
    }
  }

  function render() {
    if (status === Status.IDLE || status === Status.IN_PROGRESS) {
      return <Text>Loading...</Text>;
    } else if (status === Status.ERROR) {
      return <Text>An error occurred while fetching expenses</Text>;
    } else if (status === Status.SUCCESS) {
      return (
        <>
          <ActivityDetailsTab index={tabIndex} setIndex={setTabIndex} />
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {tabIndex === 0 ? (
              <ExpensesView expenses={expenses} />
            ) : (
              <ExpensesBalanceView expenses={expenses} />
            )}
          </ScrollView>
          <ActivityDetailsBottom expenses={expenses} username={username} />
        </>
      );
    }
  }

  return render();
};

export default ActivityDetailsPage;
