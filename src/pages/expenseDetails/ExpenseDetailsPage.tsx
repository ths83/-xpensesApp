import {useNavigation, useRoute} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Icon, Input, Text} from 'react-native-elements';
import {ACTIVITY_API} from '../../api/ActivityApi';
import {EXPENSE_API} from '../../api/ExpenseApi';
import {Pages} from '../../enums/Pages';
import activityAtom from '../../state/Activity';

const ExpenseDetailsPage = () => {
  const [activity] = useAtom(activityAtom);

  const {params} = useRoute();
  const [defaultExpense] = useState(params.expense);
  const expense = params.expense;

  const [name, setName] = useState(
    expense.expenseName === undefined ? expense.name : expense.expenseName,
  );
  const [date, setDate] = useState(expense.startDate);
  const [amount, setAmount] = useState(expense.amount);
  const [currency] = useState(expense.currency);

  const [editable, setEditable] = useState(false);

  const {navigate, goBack} = useNavigation();

  const deleteExpense = () => {
    ACTIVITY_API.deleteExpense(activity.id, expense.id).then(() => {
      navigate(Pages.EXPENSES);
    });
  };

  const updateExpense = () => {
    const newExpense = {
      id: expense.id,
      user: expense.user,
      amount: amount,
      currency: expense.currency,
      startDate: date,
      expenseName: name,
    };
    EXPENSE_API.update(newExpense).then(() => {
      navigate(Pages.EXPENSES);
    });
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.activityName}>
          {editable ? (
            <Input
              placeholder="Name"
              leftIcon={{type: 'font-awesome', name: 'file'}}
              defaultValue={name}
              onChangeText={(text) => setName(text)}
              editable={editable}
              style={styles.input}
            />
          ) : (
            <>
              <Text h3>{name}</Text>
              <Icon name="edit" onPress={() => setEditable(true)} />
            </>
          )}
        </View>
        <View style={styles.activityDetails}>
          <Input
            placeholder="User"
            leftIcon={{type: 'font-awesome', name: 'user'}}
            defaultValue={expense.user}
            editable={false}
            style={styles.input}
          />
          <Input
            placeholder="Amount"
            leftIcon={{type: 'font-awesome', name: 'money'}}
            defaultValue={amount.toString()}
            onChangeText={(text) => setAmount(text)}
            editable={editable}
            style={styles.input}
          />
          <Input
            placeholder="Currency"
            leftIcon={{type: 'font-awesome', name: 'dollar'}}
            defaultValue={currency}
            editable={false}
            style={styles.input}
          />
          <Input
            placeholder="Date"
            leftIcon={{type: 'font-awesome', name: 'time'}}
            defaultValue={date}
            onChangeText={(text) => setDate(text)}
            editable={editable}
            style={styles.input}
          />
          {editable && (
            <View style={styles.buttons}>
              <Icon
                name="cancel"
                onPress={() => {
                  setName(defaultExpense.name);
                  setAmount(defaultExpense.amount);
                  setDate(defaultExpense.startDate);
                  setEditable(false);
                }}
              />
              <Icon name="check-circle" onPress={() => setEditable(false)} />
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <Button title={'Back'} onPress={goBack} />
        <Button title={'Delete'} onPress={deleteExpense} />
        <Button title={'Update'} onPress={updateExpense} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  activityName: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityDetails: {
    marginTop: 15,
  },
  buttons: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    textAlign: 'right',
  },
});

export default ExpenseDetailsPage;
