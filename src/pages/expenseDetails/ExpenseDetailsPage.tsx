import {useNavigation, useRoute} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {ACTIVITY_API} from '../../api/ActivityApi';
import {EXPENSE_API} from '../../api/ExpenseApi';
import BackButton from '../../components/buttons/BackButton';
import CancelButton from '../../components/buttons/CancelButton';
import DeleteButton from '../../components/buttons/DeleteButton';
import EditButton from '../../components/buttons/EditButton';
import ValidateButton from '../../components/buttons/ValidateButton';
import DatePicker from '../../components/datePicker/CustomDatePicker';
import Input from '../../components/input/CustomInput';
import {Pages} from '../../enums/Pages';
import activityAtom from '../../state/Activity';
import {black, blue, darkGreen} from '../../themes/colors';
import {iMedium, iSmall} from '../../themes/icons';
import {sMedium, sNormal, sSmall} from '../../themes/size';
import {toUTC, to_YYYY_MM_DD} from '../../utils/DateFormatter';

// TODO manage input errors
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
    <DatePicker
      date={date}
      onChange={(event: Event, selectedDate: Date | undefined) => {
        setDate(to_YYYY_MM_DD(toUTC(selectedDate || date)));
      }}
    />
  );

  const resetExpense = () => {
    setName(defaultExpense.expenseName);
    setAmount(defaultExpense.amount);
    setDate(defaultExpense.startDate);
    setEditable(false);
  };

  const validateFieldsUpdate = () => {
    setEditable(false);
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
            />
          ) : (
            <>
              <Text h4>{name}</Text>
              <EditButton onPress={() => setEditable(true)} />
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
        <View style={styles.buttonsContainer}>
          <CancelButton onPress={resetExpense} />
          <ValidateButton onPress={validateFieldsUpdate} />
        </View>
      ) : (
        <View style={styles.buttonsContainer}>
          <BackButton onPress={goBack} />
          <DeleteButton onPress={deleteExpense} />
          <ValidateButton onPress={updateExpense} />
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
