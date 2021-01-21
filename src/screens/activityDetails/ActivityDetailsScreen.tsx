import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Expense from '../../model/Expense';
import {getExpenseById} from '../../api/ExpenseService';
import ExpensesView from './views/ExpensesView';
import ExpensesBalanceView from './views/ExpensesBalanceView';
import ActivityDetailsBottom from './components/activity/ActivityDetailsBottom';
import ActivityDetailsTab from './components/activity/ActivityDetailsTab';
import {getUsers} from '../../config/UsersConfiguration';
import {sortByLastDate} from '../../commons/utils/ExpenseFormatter';
import {Status} from '../../commons/enums/Status';
import {Text} from 'react-native-elements';
import {useAtom} from 'jotai';

import Activity from '../../model/Activity';
import {activityAtom} from '../../../App';

const ActivityDetailsScreen = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [activity] = useAtom<Activity>(activityAtom);

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
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
          console.log(`Successfully fetched ${expenses.length} expense(s)`);
        })
        .catch((error) => {
          setStatus(Status.ERROR);
          console.log(error);
        });
    }
  }

  function render() {
    // TODO improve render while in progress
    if (status === Status.IDLE) {
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
              <ExpensesView expenses={expenses} />
            ) : (
              <ExpensesBalanceView expenses={expenses} />
            )}
          </ScrollView>
          <ActivityDetailsBottom expenses={expenses} />
        </>
      );
    }
  }

  return render();
};

export default ActivityDetailsScreen;
