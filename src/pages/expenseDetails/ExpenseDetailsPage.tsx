import {useNavigation, useRoute} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Overlay, Text} from 'react-native-elements';
import {ACTIVITY_API} from '../../api/ActivityApi';
import {EXPENSE_API} from '../../api/ExpenseApi';
import CancelButton from '../../components/buttons/CancelButton';
import DeleteButton from '../../components/buttons/DeleteButton';
import EditHeaderButtons from '../../components/buttons/EditHeaderButtons';
import ValidateButton from '../../components/buttons/ValidateButton';
import DatePicker from '../../components/datePicker/CustomDatePicker';
import Input from '../../components/input/CustomInput';
import DeletePopUp from '../../components/popUp/DeletePopUp';
import {Pages} from '../../enums/Pages';
import {Expense} from '../../model/Expense';
import activityAtom from '../../state/Activity';
import {black, blue, dollar} from '../../themes/colors';
import {iMedium} from '../../themes/icons';
import {sMedium} from '../../themes/size';
import {toUTC, to_YYYY_MM_DD} from '../../utils/DateFormatter';

const ExpenseDetailsPage = () => {
  const [activity] = useAtom(activityAtom);

  // TODO replace by jotai
  const {params} = useRoute();
  const [defaultExpense] = useState(params.expense);
  const expense = params.expense;

  const [name, setName] = useState(expense.expenseName);
  const [errorName, setErrorName] = useState('');

  const [date, setDate] = useState(expense.startDate);
  const [amount, setAmount] = useState(expense.amount);
  const [errorAmount, setErrorAmount] = useState('');

  const [editable, setEditable] = useState(false);

  const [deletePopUp, setDeletePopUp] = useState(false);

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
    } as Expense;
    EXPENSE_API.update(newExpense).then(() => {
      navigate(Pages.EXPENSES);
    });
  };

  const Name = () => <Text h4>{name}</Text>;

  const User = () =>
    editable ? (
      <></>
    ) : (
      <View style={(styles.textIcon, styles.centerItems)}>
        <Icon name="user" type="font-awesome" size={iMedium} color={blue} />
        <Text>{expense.user}</Text>
      </View>
    );

  const Amount = () => (
    <View style={(styles.textIcon, styles.centerItems)}>
      <Icon name="money" type="font-awesome" size={iMedium} color={dollar} />
      <Text>
        {amount} {expense.currency}
      </Text>
    </View>
  );

  const Calendar = () =>
    editable ? (
      <View style={styles.centerItems}>
        <DatePicker
          date={date}
          onChange={(event: Event, selectedDate: Date | undefined) => {
            setDate(to_YYYY_MM_DD(toUTC(selectedDate || date)));
          }}
        />
      </View>
    ) : (
      <View style={(styles.textIcon, styles.centerItems)}>
        <Icon
          name="calendar"
          type="font-awesome"
          size={iMedium}
          color={black}
        />
        <Text>{activity.startDate}</Text>
      </View>
    );

  const HeaderButtons = () =>
    editable ? (
      <></>
    ) : (
      <EditHeaderButtons
        handleBackButton={goBack}
        handleEditButton={() => setEditable(true)}
      />
    );

  const BottomButtons = () =>
    editable ? (
      <View style={styles.bottomButtons}>
        <CancelButton onPress={resetExpense} />
        <ValidateButton
          onPress={validateFieldsUpdate}
          disabled={name === '' || amount === ''}
        />
      </View>
    ) : (
      <View style={styles.bottomButtons}>
        <DeleteButton onPress={() => setDeletePopUp(true)} />
        <ValidateButton
          onPress={updateExpense}
          disabled={name === '' || amount === ''}
        />
      </View>
    );

  const handleErrorName = () => {
    name === '' ? setErrorName('Activity name is required') : setErrorName('');
  };

  const handleErrorAmount = () => {
    amount === '' ? setErrorAmount('Amount is required') : setErrorAmount('');
  };

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
      <HeaderButtons />
      <View style={styles.details}>
        <View style={styles.centerItems}>
          {editable ? (
            <Input
              placeholder="Name"
              leftIcon={{type: 'font-awesome', name: 'file'}}
              defaultValue={name}
              onChangeText={(text) => {
                setName(text);
                handleErrorName();
              }}
              errorMessage={errorName}
            />
          ) : (
            <Name />
          )}
        </View>
        <View style={styles.subDetails}>
          <User />
          {editable ? (
            <Input
              placeholder="Amount"
              leftIcon={{type: 'font-awesome', name: 'money'}}
              defaultValue={amount.toString()}
              onChangeText={(text) => {
                setAmount(text);
                handleErrorAmount();
              }}
              errorMessage={errorAmount}
            />
          ) : (
            <Amount />
          )}
        </View>
        <Calendar />
      </View>
      <BottomButtons />
      <DeletePopUp
        isVisible={deletePopUp}
        onBackdropPress={() => setDeletePopUp(false)}
        handleCancel={() => setDeletePopUp(false)}
        handleValidate={() => {
          deleteExpense();
          setDeletePopUp(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  details: {
    flex: 1,
    margin: sMedium,
    justifyContent: 'center',
  },
  subDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: sMedium,
    marginBottom: sMedium,
  },
  bottomButtons: {
    margin: sMedium,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerItems: {
    alignItems: 'center',
  },
  textIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ExpenseDetailsPage;
