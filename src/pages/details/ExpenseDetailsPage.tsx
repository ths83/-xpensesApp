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
import AmountInput from '../../components/input/AmountInput';
import NameInput from '../../components/input/NameInput';
import DeletePopUp from '../../components/popUp/DeletePopUp';
import {ActivityStatus} from '../../enums/ActivityStatus';
import {Expense} from '../../model/Expense';
import activityAtom from '../../state/Activity';
import {black, blue, dollar} from '../../themes/colors';
import {iMedium} from '../../themes/icons';
import {toUTC, to_YYYY_MM_DD} from '../../utils/dateFormatter';
import {AMOUNT_REGEX} from '../../utils/regexConstants';
import {detailsStyle} from './styles';

const ExpenseDetailsPage = () => {
  const [activity] = useAtom(activityAtom);

  const {params} = useRoute();
  const [defaultExpense] = useState(params.expense);
  const expense = params.expense;

  const [name, setName] = useState(expense.expenseName);

  const [date, setDate] = useState(expense.startDate);
  const [amount, setAmount] = useState(expense.amount);

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
          onChange={(event: Event, selectedDate: any) => {
            setDate(to_YYYY_MM_DD(toUTC(selectedDate)));
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
        <Text>{date}</Text>
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

  const ActionButtons = () =>
    editable ? (
      <View style={detailsStyle.buttonsContainer}>
        <CancelButton onPress={reset} />
        <ValidateButton
          onPress={endUpdate}
          color={blue}
          disabled={name === '' || !AMOUNT_REGEX.test(amount)}
        />
      </View>
    ) : (
      <View style={detailsStyle.buttonsContainer}>
        <DeleteButton onPress={() => setDeletePopUp(true)} />
        <ValidateButton
          onPress={updateExpense}
          disabled={
            name === defaultExpense.name ||
            amount === defaultExpense.amount ||
            date === defaultExpense.startDate
          }
        />
      </View>
    );

  const reset = () => {
    setName(defaultExpense.expenseName);
    setAmount(defaultExpense.amount);
    setDate(defaultExpense.startDate);
    setEditable(false);
  };

  const endUpdate = () => {
    setEditable(false);
  };

  console.debug(date);
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
            <NameInput text={name} onChangeText={setName} />
          ) : (
            <Name />
          )}
        </View>
        {editable ? (
          <AmountInput amount={amount} onChangeAmount={setAmount} />
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
          <ActionButtons />
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
