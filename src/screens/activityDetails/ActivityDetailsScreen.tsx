import {
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useCallback, useState} from 'react';
import {useEffect} from 'react';
import {RefreshControl, View} from 'react-native';
import {Button, Header, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {activityAtom, expensesAtom} from '../../../App';
import {getActivityById} from '../../api/ActivityService';
import {getExpensesByActivity} from '../../api/ExpenseService';
import {Status} from '../../commons/enums/Status';
import {TEST_USER} from '../../config/UsersConfiguration';
import Activity from '../../model/Activity';
import Expense from '../../model/Expense';
import ActivityDetailsTab from './components/activity/ActivityDetailsTab';
import ExpensesBalanceView from './views/ExpensesBalanceView';
import ExpensesView from './views/ExpensesView';

function ActivityDetailsScreen() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [refreshing, setRefreshing] = useState(false);

  const [activity, setActivity] = useAtom<Activity>(activityAtom);
  const [expenses, setExpenses] = useAtom<Expense[]>(expensesAtom);

  const {navigate} = useNavigation();

  const isFocused = useIsFocused();

  useEffect(() => {
    console.log('activity fetched !');
    fetchActivity();
  }, [isFocused]);

  function onRefresh() {
    setRefreshing(true);
    fetchActivity();
    setRefreshing(false);
  }

  async function fetchActivity() {
    setStatus(Status.IN_PROGRESS);
    getActivityById(activity.id)
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

  function fetchExpenses() {
    if (activity?.expenses === undefined || activity?.expenses.length === 0) {
      setExpenses([]);
      setStatus(Status.SUCCESS);
    } else {
      getExpensesByActivity(activity.id)
        .then((response) => {
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
    // TODO improve render while in progress
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
              <ExpensesView expenses={expenses} />
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

export default ActivityDetailsScreen;
