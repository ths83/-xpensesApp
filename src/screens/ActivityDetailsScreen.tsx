import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {getActivityById} from '../api/ActivityService';
import Activity from '../model/Activity';
import {ButtonGroup, Header, ListItem, Text} from 'react-native-elements';
import Expense from '../model/Expense';
import {getExpenseById} from '../api/ExpenseService';
import {ScrollView} from 'react-native-gesture-handler';

const ActivityDetailsScreen = (route) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  const [expenses, setExpenses] = useState<Expense[]>([]);

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
        );
        setSelectedActivity(foundActivity);
        extractExpenses(foundActivity);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function extractExpenses(activity: Activity) {
    if (activity?.expenses === undefined || activity?.expenses.length === 0) {
      setExpenses([]);
    } else {
      Promise.all(
        activity?.expenses.map((expenseId) => getExpenseById(expenseId)),
      ).then((response) => {
        const mappedExpenses = response.map((ex: any) => {
          return new Expense(ex.id, ex.userId, ex.amount, ex.currency);
        });
        setExpenses(mappedExpenses);
      });
    }
  }

  // FIXME get icons from header
  return (
    <>
      <View>
        <Header
          // leftComponent={getHomeHeader()}
          centerComponent={{
            text: selectedActivity?.name,
            style: {color: '#fff'},
          }}
          // rightComponent={{icon: 'alert-circle-outline', color: '#fff'}}
        />
        <ButtonGroup
          buttons={[
            {element: () => <Text>Expenses</Text>},
            {element: () => <Text>Balance</Text>},
          ]}
          onPress={() => console.log('clicked')} //TODO add action
        />
      </View>
      <ScrollView>
        {expenses.length === 0 ? (
          <Text>No expenses found</Text>
        ) : (
          expenses.map((expense, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>
                  {expense.amount} {expense.currency}
                </ListItem.Title>
                <ListItem.Subtitle>{expense.userId}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))
        )}
      </ScrollView>
    </>
  );
};

export default ActivityDetailsScreen;
