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
import {ExpensesFilter} from '../../enums/ExpensesFilter';
import {ExpensesTabIndex} from '../../enums/ExpensesTabIndex';
import {Status} from '../../enums/Status';
import activityAtom from '../../state/Activity';
import expensesAtom, {buildExpenses} from '../../state/expenses/Expenses';
import userAtom from '../../state/User';
import {toYYYY_MM_DD} from '../../utils/DateFormatter';
import ExpensesBalanceView from './ExpensesBalanceView';
import ExpensesView from './ExpensesView';

const ActivityDetailsPage = () => {
  const [tabIndex, setTabIndex] = useState<ExpensesTabIndex>(
    ExpensesTabIndex.LIST,
  );
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [refreshing, setRefreshing] = useState(false);
  const [expensesIndex, setExpenseIndex] = useState<ExpensesFilter>(
    ExpensesFilter.NO,
  );

  const [username] = useAtom(userAtom);
  const [activity, setActivity] = useAtom(activityAtom);
  const [, setExpenses] = useAtom(expensesAtom);

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
    ACTIVITY_API.getById(activity.id)
      .then((fetchedActivity) => setActivity(fetchedActivity))
      .catch(() => setStatus(Status.ERROR));
  }

  async function fetchExpenses() {
    fetchActivity();
    if (activity?.expenses === undefined || activity?.expenses?.length === 0) {
      setExpenses(buildExpenses([], ''));
      setStatus(Status.SUCCESS);
    } else {
      EXPENSE_API.getByActivityId(activity.id)
        .then((fetchedExpenses) => {
          fetchedExpenses.map((fetchedExpense) => {
            fetchedExpense.date = toYYYY_MM_DD(fetchedExpense.date);
            return fetchedExpense;
          });
          setExpenses(buildExpenses(fetchedExpenses, username));
          setStatus(Status.SUCCESS);
        })
        .catch(() => {
          setExpenses(buildExpenses([], ''));
          setStatus(Status.ERROR);
        });
    }
  }

  function render() {
    if (status === Status.ERROR) {
      return <Text>An error occurred while fetching expenses</Text>;
    } else {
      return (
        <>
          <ActivityDetailsTab index={tabIndex} setIndex={setTabIndex} />
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {tabIndex === ExpensesTabIndex.LIST ? (
              <ExpensesView index={expensesIndex} />
            ) : (
              <ExpensesBalanceView />
            )}
          </ScrollView>
          <ActivityDetailsBottom setExpensesIndex={setExpenseIndex} />
        </>
      );
    }
  }

  return render();
};

export default ActivityDetailsPage;
