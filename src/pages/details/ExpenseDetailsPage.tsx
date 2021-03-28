import {useNavigation, useRoute} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-elements';
import {ACTIVITY_API} from '../../api/ActivityApi';
import {EXPENSE_API} from '../../api/ExpenseApi';
import BackButton from '../../components/buttons/BackButton';
import ActionButtons from '../../components/details/ActionButtons';
import Amount from '../../components/details/Amount';
import Calendar from '../../components/details/Calendar';
import HeaderButtons from '../../components/details/HeaderButtons';
import User from '../../components/details/User';
import AmountInput from '../../components/input/AmountInput';
import NameInput from '../../components/input/NameInput';
import {ActivityStatus} from '../../enums/ActivityStatus';
import {Expense} from '../../model/Expense';
import activityAtom from '../../state/Activity';
import userAtom from '../../state/User';
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
  const [amount, setAmount] = useState(formatAmount(Number(expense.amount)));

  const [editable, setEditable] = useState(false);

  const {goBack} = useNavigation();

  const del = () => {
    ACTIVITY_API.deleteExpense(activity.id, expense.id).then(() => goBack());
  };

  const update = () => {
    const updatedExpense = {
      id: expense.id,
      user: expense.user,
      amount: amount,
      currency: expense.currency,
      startDate: date,
      expenseName: name,
    } as Expense;
    EXPENSE_API.update(updatedExpense).then(() => goBack());
  };

  const Name = () => (
    <>
      <Text h4>{name}</Text>
      <Text style={detailsStyle.blue}>From {activity.activityName}</Text>
    </>
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
        <HeaderButtons
          editable={editable}
          handleBack={goBack}
          handleEdit={() => setEditable(true)}
        />
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
            <User username={username} activity={activity} />
            <Amount amount={amount} currency={expense.currency} />
          </View>
        )}
        <Calendar editable={editable} date={date} onChange={setDate} />
      </ScrollView>
      {activity.activityStatus === ActivityStatus.IN_PROGRESS && (
        <>
          <ActionButtons
            editable={editable}
            handleCancel={reset}
            handleValidate={endUpdate}
            disabledValidate={name === '' || !AMOUNT_REGEX.test(amount)}
            handleDelete={del}
            handleUpdate={update}
            disabledUpdate={
              name === defaultExpense.expenseName &&
              amount === defaultExpense.amount &&
              formatDate(date) === formatDate(defaultExpense.startDate)
            }
          />
        </>
      )}
    </>
  );
};

export default ExpenseDetailsPage;
