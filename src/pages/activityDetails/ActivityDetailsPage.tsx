import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {ACTIVITY_API} from '../../api/ActivityApi';
import BackButton from '../../components/buttons/BackButton';
import CancelButton from '../../components/buttons/CancelButton';
import DeleteButton from '../../components/buttons/DeleteButton';
import EditButton from '../../components/buttons/EditButton';
import ValidateButton from '../../components/buttons/ValidateButton';
import DatePicker from '../../components/datePicker/CustomDatePicker';
import Input from '../../components/input/CustomInput';
import {Currency} from '../../enums/Currency';
import {Pages} from '../../enums/Pages';
import activityAtom from '../../state/Activity';
import expensesAtom from '../../state/Expenses';
import {black, darkGreen} from '../../themes/colors';
import {iMedium} from '../../themes/icons';
import {sLarge, sMedium, sSmall} from '../../themes/size';
import {formatAmount} from '../../utils/AmountFormatter';
import {toUTC, to_YYYY_MM_DD} from '../../utils/DateFormatter';

const ActivityDetailsPage = () => {
  const [editable, setEditable] = useState(false);

  const [activity] = useAtom(activityAtom);
  const [expenses] = useAtom(expensesAtom);

  const [name, setName] = useState(activity.activityName);
  const [date, setDate] = useState(activity.startDate);

  const {navigate, goBack} = useNavigation();

  async function update() {
    ACTIVITY_API.update(activity.id, name, date).then(() =>
      navigate(Pages.ACTIVITIES),
    );
  }

  async function del() {
    ACTIVITY_API.delete(activity.id).then(() => navigate(Pages.ACTIVITIES));
  }

  const resetExpense = () => {
    setName(activity.activityName);
    setEditable(false);
  };

  const validateFieldsUpdate = () => {
    setEditable(false);
  };

  const User = () =>
    editable ? (
      <></>
    ) : (
      <View style={styles.data}>
        <Icon name="user" type="font-awesome" size={iMedium} color={black} />
        <Text>{activity?.createdBy}</Text>
      </View>
    );

  const ExpenseDate = () => (
    <DatePicker
      date={date}
      onChange={(event: Event, selectedDate: Date | undefined) => {
        setDate(selectedDate ? to_YYYY_MM_DD(toUTC(selectedDate)) : date);
      }}
    />
  );

  const expenseTotal = () => {
    let total = 0;
    expenses.all.map((expense) => (total += expense.amount));
    return formatAmount(total);
  };

  const Other = () =>
    editable ? (
      <></>
    ) : (
      <>
        <View style={styles.data}>
          <Icon
            name="list-ol"
            type="font-awesome"
            size={iMedium}
            color={black}
          />
          <Text>{activity.expenses?.length}</Text>
        </View>
        <View style={styles.data}>
          <Icon
            name="money"
            type="font-awesome"
            size={iMedium}
            color={darkGreen}
          />
          <Text>
            {expenseTotal()} {Currency.CANADA}
          </Text>
        </View>
      </>
    );
  return (
    <>
      <View style={styles.activityName}>
        {editable ? (
          <Input
            placeholder="Name"
            leftIcon={{type: 'font-awesome', name: 'file'}}
            defaultValue={name}
            onChangeText={(text) => setName(text)}
            // TODO error message if empty
          />
        ) : (
          <>
            <EditButton onPress={() => setEditable(true)} />
            <Text h4>{name}</Text>
          </>
        )}
      </View>
      <View style={styles.activityDetails}>
        <User />
        <Other />
        <ExpenseDate />
      </View>
      {editable ? (
        <View style={styles.buttonsContainer}>
          <CancelButton onPress={resetExpense} />
          <ValidateButton onPress={validateFieldsUpdate} />
        </View>
      ) : (
        <View style={styles.buttonsContainer}>
          <BackButton onPress={goBack} />
          <DeleteButton onPress={del} />
          <ValidateButton onPress={update} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  activityName: {
    margin: sLarge,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityDetails: {
    flex: 1,
    justifyContent: 'center',
    margin: sLarge,
  },
  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: sMedium,
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: sSmall,
    marginBottom: sSmall,
  },
  buttonsContainer: {
    margin: sMedium,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ActivityDetailsPage;
