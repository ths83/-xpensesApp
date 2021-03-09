import {useIsFocused} from '@react-navigation/core';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {EXPENSE_API} from '../../api/ExpenseApi';
import ActivityDetailsBottom from '../../components/activities/ActivityDetailsBottom';
import ActivityDetailsTab from '../../components/activities/ActivityDetailsTab';
import Loading from '../../components/loader/Loading';
import {ExpensesFilter} from '../../enums/ExpensesFilter';
import {ExpensesTabIndex} from '../../enums/ExpensesTabIndex';
import {Status} from '../../enums/Status';
import activityAtom from '../../state/Activity';
import expensesAtom, {buildExpenses} from '../../state/Expenses';
import userAtom from '../../state/User';
import {format} from '../../utils/DateFormatter';
import ExpensesBalanceView from './ExpensesBalanceView';
import ExpensesView from './ExpensesView';

const ExpensesPage = () => {
  const [tabIndex, setTabIndex] = useState<ExpensesTabIndex>(
    ExpensesTabIndex.LIST,
  );
  const [status, setStatus] = useState(Status.IDLE);
  const [refreshing, setRefreshing] = useState(false);
  const [expensesIndex, setExpenseIndex] = useState(ExpensesFilter.NO);

  const [username] = useAtom(userAtom);
  const [activity] = useAtom(activityAtom);
  const [, setExpenses] = useAtom(expensesAtom);

  const isFocused = useIsFocused();

  const onRefresh = () => {
    setRefreshing(true);
    fetchExpenses();
    setRefreshing(false);
  };

  const fetchExpenses = useCallback(() => {
    setStatus(Status.IN_PROGRESS);
    EXPENSE_API.getByActivityId(activity.id)
      .then((fetchedExpenses) => {
        fetchedExpenses.map((fetchedExpense) => {
          fetchedExpense.startDate = format(fetchedExpense.startDate);
          return fetchedExpense;
        });
        setExpenses(buildExpenses(fetchedExpenses, username));
        setStatus(Status.SUCCESS);
      })
      .catch(() => {
        setExpenses(buildExpenses([], ''));
        setStatus(Status.ERROR);
      });
  }, [activity.id, setExpenses, username]);

  useEffect(() => {
    if (isFocused && activity.id !== '') {
      fetchExpenses();
    }
  }, [isFocused, fetchExpenses, activity.id]);

  function render() {
    if (status === (Status.IDLE || Status.IN_PROGRESS)) {
      return <Loading />;
    } else if (status === Status.ERROR) {
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

export default ExpensesPage;
