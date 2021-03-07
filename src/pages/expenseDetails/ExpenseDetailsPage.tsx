import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Icon, Input, Text} from 'react-native-elements';
import {ACTIVITY_API} from '../../api/ActivityApi';
import {EXPENSE_API} from '../../api/ExpenseApi';
import {Pages} from '../../enums/Pages';
import activityAtom from '../../state/Activity';
import {black, blue, darkGreen, green, red, skyBlue} from '../../themes/colors';
import {iMedium, iSmall} from '../../themes/icons';
import {sMedium, sNormal, sSmall} from '../../themes/size';
import {toUTC, to_YYYY_MM_DD} from '../../utils/DateFormatter';

const ExpenseDetailsPage = () => {
  const [activity] = useAtom(activityAtom);

  // TODO replace by jotai
  const {params} = useRoute();
  const [defaultExpense] = useState(params.expense);
  const expense = params.expense;

  const [name, setName] = useState(expense.expenseName);
  const [date, setDate] = useState(expense.startDate);
  const [amount, setAmount] = useState(expense.amount);

  const [editable, setEditable] = useState(false);
  const [datePicker, setDatePicker] = useState(false);

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

  const User = () =>
    editable ? (
      <></>
    ) : (
      <View style={styles.data}>
        <Icon name="user" type="font-awesome" size={iMedium} color={black} />
        <Text h4>{expense.user}</Text>
      </View>
    );

  const Amount = () =>
    editable ? (
      <Input
        placeholder="Amount"
        leftIcon={{type: 'font-awesome', name: 'money'}}
        defaultValue={amount.toString()}
        onChangeText={(text) => setAmount(text)}
        style={styles.input}
      />
    ) : (
      <View style={styles.data}>
        <Icon
          name="money"
          type="font-awesome"
          size={iMedium}
          color={darkGreen}
        />
        <Text h4>
          {amount} {expense.currency}
        </Text>
      </View>
    );

  const ActivityDate = () => (
    <>
      {editable ? (
        <View style={styles.calendar}>
          <Icon
            reverse
            name="calendar"
            type="font-awesome"
            onPress={() => setDatePicker(true)}
            size={iSmall}
            color={blue}
          />
          <Text h4>{date}</Text>
        </View>
      ) : (
        <View style={styles.data}>
          <Icon
            name="calendar"
            type="font-awesome"
            size={iMedium}
            color={skyBlue}
          />
          <Text h4>{date}</Text>
        </View>
      )}
      {datePicker && (
        // TODO externalize in a component
        <DateTimePicker
          value={toUTC(new Date(date))}
          onChange={(event: Event, selectedDate: Date | undefined) => {
            setDate(to_YYYY_MM_DD(toUTC(selectedDate || date)));
            setDatePicker(false);
          }}
        />
      )}
    </>
  );

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
              style={styles.input}
            />
          ) : (
            <>
              <Text h4>{name}</Text>
              {/* TODO externalize ina component */}
              <Icon
                reverse
                name="edit"
                type="font-awesome"
                onPress={() => setEditable(true)}
                size={iSmall}
                color={blue}
              />
            </>
          )}
        </View>
        <View style={styles.activityDetails}>
          <User />
          <Amount />
          <ActivityDate />
        </View>
      </ScrollView>
      {editable ? (
        // TODO externalize each button to a component
        <View style={styles.buttonsContainer}>
          <Icon
            reverse
            name="times"
            type="font-awesome"
            onPress={() => {
              setName(defaultExpense.expenseName);
              setAmount(defaultExpense.amount);
              setDate(defaultExpense.startDate);
              setEditable(false);
              setDatePicker(false);
            }}
            size={iSmall}
            color={red}
          />
          <Icon
            reverse
            name="check"
            type="font-awesome"
            onPress={() => {
              setEditable(false);
              setDatePicker(false);
            }}
            size={iSmall}
            color={green}
          />
        </View>
      ) : (
        <View style={styles.buttonsContainer}>
          <Icon
            name="arrow-left"
            type="font-awesome"
            reverse
            size={iSmall}
            onPress={goBack}
            color={red}
          />
          <Icon
            name="trash"
            type="font-awesome"
            reverse
            size={iSmall}
            onPress={deleteExpense}
            color={black}
          />
          <Icon
            name="check"
            type="font-awesome"
            reverse
            size={iSmall}
            onPress={updateExpense}
            color={green}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: sNormal,
  },
  activityName: {
    margin: sNormal,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityDetails: {
    display: 'flex',
    justifyContent: 'center',
    margin: sNormal,
  },
  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: sNormal,
  },
  input: {
    textAlign: 'right',
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: sSmall,
    marginBottom: sNormal,
  },
  buttonsContainer: {
    margin: sMedium,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ExpenseDetailsPage;
