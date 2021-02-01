import {useIsFocused, useRoute} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {currentUserAtom} from '../../../App';
import {ACTIVITY_API} from '../../api/ActivityApi';
import {EXPENSE_API} from '../../api/ExpenseApi';
import {Status} from '../../commons/enums/Status';
import Activity from '../../model/Activity';
import Expense from '../../model/Expense';
import {toYYYY_MM_DD} from '../../utils/DateFormatter';
import ActivityDetailsBottom from './components/ActivityDetailsBottom';
import ActivityDetailsTab from './components/ActivityDetailsTab';
import ExpensesBalanceView from './views/ExpensesBalanceView';
import ExpensesView from './views/ExpensesView';

const ActivityDetailsPage = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [refreshing, setRefreshing] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [username] = useAtom(currentUserAtom);

  const isFocused = useIsFocused();

  const {params} = useRoute();
  const {activityId} = params;

  useEffect(() => {
    fetchActivity();
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    console.debug('Refreshing activity...');
    setRefreshing(true);
    fetchActivity();
    setRefreshing(false);
  }, []);

  async function fetchActivity() {
    setStatus(Status.IN_PROGRESS);
    ACTIVITY_API.getById(activityId)
      .then((fetchedActivity) => {
        console.debug(`Successfully fetched activity '${fetchedActivity.id}'`);
        fetchExpenses(fetchedActivity);
      })
      .catch((error) => {
        setStatus(Status.ERROR);
        console.debug(error);
      });
  }

  async function fetchExpenses(activity: Activity) {
    if (activity?.expenses === undefined || activity?.expenses.length === 0) {
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
          console.debug(`Successfully fetched ${expenses.length} expense(s)`);
        })
        .catch((error) => {
          setExpenses([]);
          setStatus(Status.ERROR);
          console.debug(error);
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
              <ExpensesView activityId={activityId} expenses={expenses} />
            ) : (
              <ExpensesBalanceView expenses={expenses} />
            )}
          </ScrollView>
          <ActivityDetailsBottom
            activityId={activityId}
            expenses={expenses}
            username={username}
          />
        </>
      );
    }
  }

  return render();
};

export default ActivityDetailsPage;
