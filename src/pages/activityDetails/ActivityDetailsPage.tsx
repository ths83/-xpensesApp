import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';
import {Button, Header, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {activityAtom} from '../../../App';
import {ACTIVITY_API} from '../../api/ActivityApi';
import {EXPENSE_API} from '../../api/ExpenseApi';
import {Status} from '../../commons/enums/Status';
import {TEST_USER} from '../../config/UsersConfiguration';
import Activity from '../../model/Activity';
import Expense from '../../model/Expense';
import ActivityDetailsTab from './components/ActivityDetailsTab';
import ExpensesBalanceView from './views/ExpensesBalanceView';
import ExpensesView from './views/ExpensesView';

function ActivityDetailsPage() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [refreshing, setRefreshing] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [activity, setActivity] = useAtom<Activity>(activityAtom);

  const {navigate} = useNavigation();

  const isFocused = useIsFocused();

  useEffect(() => {
    fetchActivity();
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchActivity();
    setRefreshing(false);
  }, []);

  async function fetchActivity() {
    setStatus(Status.IN_PROGRESS);
    ACTIVITY_API.getById(activity.id)
      .then((response) => {
        console.log(`Successfully fetched activity ${activity.id}`);
        const fetchedActivity = new Activity(
          response.id,
          response.name,
          response.createdBy,
          response.expenses,
          response.users,
          response.date,
        );
        setActivity(fetchedActivity);
        fetchExpenses();
      })
      .catch((error) => {
        setStatus(Status.ERROR);
        console.log(error);
      });
  }

  async function fetchExpenses() {
    if (activity?.expenses === undefined || activity?.expenses.length === 0) {
      setExpenses([]);
      setStatus(Status.SUCCESS);
    } else {
      EXPENSE_API.getByActivityId(activity.id)
        .then((response) => {
          const mappedExpenses = response.map((ex: any) => {
            return new Expense(
              ex.id,
              ex.user,
              ex.amount,
              ex.currency,
              ex.date,
              ex.name,
            );
          });
          setExpenses(mappedExpenses);
          setStatus(Status.SUCCESS);
          console.log(`Successfully fetched ${expenses.length} expense(s)`);
        })
        .catch((error) => {
          setStatus(Status.ERROR);
          console.log(error);
        });
    }
  }

  function renderBottomLeft() {
    let userTotal = 0;
    expenses.map((expense: Expense) => {
      // TODO change by current user
      if (expense.user === TEST_USER) {
        userTotal += expense.amount;
      }
    });
    return (
      <>
        <Text>My total</Text>
        <Text>{userTotal}</Text>
      </>
    );
  }

  function renderBottomRight() {
    let total = 0;
    expenses.map((expense: Expense) => {
      total += expense.amount;
    });
    return (
      <>
        <Text>Total</Text>
        <Text>{total}</Text>
      </>
    );
  }

  // TODO resolve icon issue
  function renderBottomCenter() {
    return (
      <>
        <Button
          onPress={() => {
            navigate('AddExpense');
          }}
          // icon={{
          //   name: 'arrow-right',
          //   size: 10,
          //   color: 'white',
          // }}
        />
      </>
    );
  }

  function render() {
    if (status === Status.IDLE || status === Status.IN_PROGRESS) {
      return <Text>Loading...</Text>;
    } else if (status === Status.ERROR) {
      return <Text>An error occurred while fetching expenses</Text>;
    } else if (status === Status.SUCCESS) {
      return (
        <>
          <View>
            <ActivityDetailsTab index={tabIndex} setIndex={setTabIndex} />
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {tabIndex === 0 ? (
              <ExpensesView activityId={activity.id} expenses={expenses} />
            ) : (
              <ExpensesBalanceView expenses={expenses} />
            )}
          </ScrollView>
          <Header
            leftComponent={renderBottomLeft()}
            centerComponent={renderBottomCenter()}
            rightComponent={renderBottomRight()}
          />
        </>
      );
    }
  }

  return render();
}

export default ActivityDetailsPage;
