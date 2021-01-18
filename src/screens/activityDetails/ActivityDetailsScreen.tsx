import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Activity from '../../model/Activity';
import Expense from '../../model/Expense';
import {getActivityById} from '../../api/ActivityService';
import {getExpenseById} from '../../api/ExpenseService';
import ExpensesView from './views/ExpensesView';
import ExpensesBalanceView from './views/ExpensesBalanceView';
import {useRoute} from '@react-navigation/native';
import ActivityDetailsBottom from './component/activity/ActivityDetailsBottom';
import ActivityDetailsTab from './component/activity/ActivityDetailsTab';
import {getUsers} from '../../config/UsersConfiguration';
import {sortByLastDate} from '../../shared/utils/ExpenseFormatter';
import {Status} from '../../shared/constant/Status';
import {Text} from 'react-native-elements';

const ActivityDetailsScreen = () => {
  const [activity, setActivity] = useState<Activity>();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);

  const [status, setStatus] = useState<Status>(Status.IDLE);

  const users = useRef<string[]>(getUsers());

  const {params} = useRoute();

  useEffect(() => {
    fetchActivity();
  }, []);

  async function fetchActivity() {
    setStatus(Status.IN_PROGRESS);
    const {activityId} = params;
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
        setActivity(activity);
        fetchExpenses(activity);
      })
      .catch((error) => {
        setStatus(Status.ERROR);
        console.log(error);
      });
  }

  async function fetchExpenses(activity: Activity) {
    if (activity?.expenses === undefined || activity?.expenses.length === 0) {
      setExpenses([]);
      setStatus(Status.SUCCESS);
    } else {
      Promise.all(
        activity?.expenses.map((expenseId) => getExpenseById(expenseId)),
      )
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
          setExpenses(sortByLastDate(mappedExpenses));
          setStatus(Status.SUCCESS);
        })
        .catch((error) => {
          setStatus(Status.ERROR);
          console.log(error);
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
          <View>
            <ActivityDetailsTab index={tabIndex} setIndex={setTabIndex} />
          </View>
          <ScrollView>
            {tabIndex === 0 ? (
              <ExpensesView activity={activity} expenses={expenses} />
            ) : (
              <ExpensesBalanceView expenses={expenses} users={users.current} />
            )}
          </ScrollView>
          <ActivityDetailsBottom
            expenses={expenses}
            activity={activity}
            active={activity?.activityStatus === Status.IN_PROGRESS}
          />
        </>
      );
    }
  }

  return render();
};

export default ActivityDetailsScreen;
