import {useNavigation, useRoute} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {ACTIVITY_API} from '../../api/ActivityApi';
import {EXPENSE_API} from '../../api/ExpenseApi';
import BackButton from '../../components/buttons/BackButton';
import CancelButton from '../../components/buttons/CancelButton';
import DeleteButton from '../../components/buttons/DeleteButton';
import EditHeaderButtons from '../../components/buttons/EditHeaderButtons';
import ValidateButton from '../../components/buttons/ValidateButton';
import DatePicker from '../../components/datePicker/CustomDatePicker';
import Input from '../../components/input/CustomInput';
import DeletePopUp from '../../components/popUp/DeletePopUp';
import {ActivityStatus} from '../../enums/ActivityStatus';
import {Pages} from '../../enums/Pages';
import {Expense} from '../../model/Expense';
import activityAtom from '../../state/Activity';
import {black, blue, dollar} from '../../themes/colors';
import {iMedium} from '../../themes/icons';
import {toUTC, to_YYYY_MM_DD} from '../../utils/DateFormatter';
import {detailsStyle} from './styles';

const ExpenseDetailsPage = () => {
  const [activity] = useAtom(activityAtom);

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

  const {goBack} = useNavigation();

  const deleteExpense = () => {
    ACTIVITY_API.deleteExpense(activity.id, expense.id).then(() => goBack());
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
    EXPENSE_API.update(newExpense).then(() => goBack());
  };

  const Name = () => (
    <>
      <Text h4>{name}</Text>
      <Text style={detailsStyle.blue}>from {activity.activityName}</Text>
    </>
  );

  const User = () => (
    <View style={(detailsStyle.rowCenter, detailsStyle.center)}>
      <Icon name="user" type="font-awesome-5" size={iMedium} color={blue} />
      <Text>{expense.user}</Text>
    </View>
  );

  const Amount = () => (
    <View style={(detailsStyle.rowCenter, detailsStyle.center)}>
      <Icon
        name="money-bill"
        type="font-awesome-5"
        size={iMedium}
        color={dollar}
      />
      <Text>
        {amount} {expense.currency}
      </Text>
    </View>
  );

  const Calendar = () =>
    editable ? (
      <View style={detailsStyle.center}>
        <DatePicker
          date={date}
          onChange={(event: Event, selectedDate: Date | undefined) => {
            setDate(to_YYYY_MM_DD(toUTC(selectedDate || date)));
          }}
        />
      </View>
    ) : (
      <View style={(detailsStyle.rowCenter, detailsStyle.center)}>
        <Icon
          name="calendar"
          type="font-awesome-5"
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
      <View style={detailsStyle.buttonsContainer}>
        <CancelButton onPress={resetExpense} />
        <ValidateButton
          onPress={validateFieldsUpdate}
          disabled={name === '' || amount === ''}
        />
      </View>
    ) : (
      <View style={detailsStyle.buttonsContainer}>
        <DeleteButton onPress={() => setDeletePopUp(true)} />
        <ValidateButton
          onPress={updateExpense}
          disabled={name === expense.name || amount === expense.amount}
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
      {activity.activityStatus === ActivityStatus.IN_PROGRESS ? (
        <HeaderButtons />
      ) : (
        <View style={detailsStyle.backButton}>
          <BackButton onPress={goBack} />
        </View>
      )}
      <View style={detailsStyle.details}>
        <View style={detailsStyle.center}>
          {editable ? (
            <Input
              placeholder="Name"
              leftIcon={{type: 'font-awesome-5', name: 'heading'}}
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
        {editable ? (
          <Input
            placeholder="Amount"
            leftIcon={{type: 'font-awesome-5', name: 'money-bill'}}
            defaultValue={amount.toString()}
            onChangeText={(text) => {
              setAmount(text);
              handleErrorAmount();
            }}
            errorMessage={errorAmount}
            keyboardType="numeric"
          />
        ) : (
          <View style={detailsStyle.subDetails}>
            <User />
            <Amount />
          </View>
        )}
        <Calendar />
      </View>
      {activity.activityStatus === ActivityStatus.IN_PROGRESS ? (
        <>
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
      ) : (
        <Text style={detailsStyle.warning} h4>
          Activity closed
        </Text>
      )}
    </>
  );
};

export default ExpenseDetailsPage;
