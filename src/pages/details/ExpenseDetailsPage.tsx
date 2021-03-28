import {useNavigation, useRoute} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
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
import userAtom from '../../state/User';
import {black, blue, dollar} from '../../themes/colors';
import {iMedium} from '../../themes/icons';
import {formatAmount} from '../../utils/amountFormatter';
import {formatDate} from '../../utils/dateFormatter';
import {AMOUNT_REGEX} from '../../utils/regexConstants';
import {detailsStyle} from './styles';

const ExpenseDetailsPage = () => {
  const [username] = useAtom(userAtom);
  const [activity] = useAtom(activityAtom);

  const {params} = useRoute();
  const [defaultExpense] = useState(params.expense);
  const expense = params.expense as Expense;

  const [name, setName] = useState(expense.expenseName);

  const [date, setDate] = useState(formatDate(expense.startDate));
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
      <Text>{username === expense.user ? ' Me' : expense.user}</Text>
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
        {formatAmount(Number(amount))} {expense.currency}
      </Text>
    </View>
  );

  const Calendar = () =>
    editable ? (
      <View style={detailsStyle.center}>
        <DatePicker date={date} onChange={setDate} />
      </View>
    ) : (
      <View style={(detailsStyle.rowCenter, detailsStyle.center)}>
        <Icon
          name="calendar"
          type="font-awesome-5"
          size={iMedium}
          color={black}
        />
        <Text>{formatDate(date)}</Text>
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
          disabled={name === '' || !AMOUNT_REGEX.test(amount.toString())}
        />
      </View>
    ) : (
      <View style={detailsStyle.buttonsContainer}>
        <DeleteButton onPress={() => setDeletePopUp(true)} />
        <ValidateButton
          onPress={updateExpense}
          disabled={
            name === defaultExpense.expenseName &&
            amount === defaultExpense.amount &&
            formatDate(date) === formatDate(defaultExpense.startDate)
          }
        />
      </View>
    );

  const reset = () => {
    setName(defaultExpense.expenseName);
    setAmount(defaultExpense.amount);
    setDate(formatDate(defaultExpense.startDate));
    setEditable(false);
  };

  const endUpdate = () => {
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
      <ScrollView style={detailsStyle.details}>
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
      </ScrollView>
      {activity.activityStatus === ActivityStatus.IN_PROGRESS && (
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
      )}
    </>
  );
};

export default ExpenseDetailsPage;
