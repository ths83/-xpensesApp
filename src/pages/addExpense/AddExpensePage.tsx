import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {EXPENSE_API} from '../../api/ExpenseApi';
import CancelButton from '../../components/buttons/CancelButton';
import ValidateButton from '../../components/buttons/ValidateButton';
import DatePicker from '../../components/datePicker/CustomDatePicker';
import Error from '../../components/status/Error';
import Input from '../../components/input/CustomInput';
import Loading from '../../components/status/Loading';
import {Status} from '../../enums/Status';
import activityAtom from '../../state/Activity';
import {sMedium, sNormal} from '../../themes/size';
import {toUTC, to_YYYY_MM_DD} from '../../utils/DateFormatter';

const AddExpensePage = () => {
  const [name, setName] = useState<string>('');
  const [errorName, setErrorName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [errorAmount, setErrorAmount] = useState<string>('');
  const [status, setStatus] = useState<Status>(Status.IDLE);

  const initialDate = to_YYYY_MM_DD(toUTC(new Date()));
  const [date, setDate] = useState(initialDate);

  const [activity] = useAtom(activityAtom);

  const {goBack} = useNavigation();

  function isValidName() {
    if (name === '') {
      setErrorName('Name is required');
      return false;
    } else {
      setErrorName('');
      return true;
    }
  }

  function isValidAmount() {
    if (amount === '') {
      setErrorAmount('Amount is required');
      return false;
    } else {
      setErrorAmount('');
      return true;
    }
  }

  function createExpense() {
    setStatus(Status.IN_PROGRESS);
    if (isValidName() && isValidAmount()) {
      return EXPENSE_API.create(name, amount, activity.id)
        .then(() => {
          setStatus(Status.SUCCESS);
          goBack();
        })
        .catch(() => setStatus(Status.ERROR));
    } else {
      setStatus(Status.IDLE);
    }
  }

  const render = () => {
    if (status === Status.IN_PROGRESS) {
      return <Loading />;
    } else if (status === Status.ERROR) {
      return <Error text="An error occurred while adding expense" />;
    } else {
      return (
        <>
          <View style={styles.container}>
            <Input
              placeholder="Name"
              onChangeText={(text) => setName(text)}
              leftIcon={{type: 'font-awesome-5', name: 'heading'}}
              errorMessage={errorName}
            />
            <Input
              placeholder="Amount (CAD)"
              onChangeText={(text) => setAmount(text)}
              leftIcon={{type: 'font-awesome-5', name: 'money-bill'}}
              errorMessage={errorAmount}
              keyboardType="numeric"
            />
            <DatePicker
              date={date}
              onChange={(event: Event, selectedDate: Date | undefined) => {
                setDate(
                  selectedDate
                    ? to_YYYY_MM_DD(toUTC(selectedDate))
                    : initialDate,
                );
              }}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <CancelButton onPress={goBack} />
            <ValidateButton
              onPress={createExpense}
              disabled={name === '' || amount === ''}
            />
          </View>
        </>
      );
    }
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: sMedium,
    justifyContent: 'center',
  },
  title: {
    margin: sMedium,
    marginBottom: sNormal,
  },
  buttonsContainer: {
    margin: sMedium,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddExpensePage;
