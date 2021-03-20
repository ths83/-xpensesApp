import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {EXPENSE_API} from '../../api/ExpenseApi';
import CancelButton from '../../components/buttons/CancelButton';
import ValidateButton from '../../components/buttons/ValidateButton';
import DatePicker from '../../components/datePicker/CustomDatePicker';
import AmountInput from '../../components/input/AmountInput';
import NameInput from '../../components/input/NameInput';
import Error from '../../components/status/Error';
import Loading from '../../components/status/Loading';
import {Status} from '../../enums/Status';
import activityAtom from '../../state/Activity';
import {blue} from '../../themes/colors';
import {sMedium, sNormal} from '../../themes/size';
import {toUTC, to_YYYY_MM_DD} from '../../utils/dateFormatter';
import {AMOUNT_REGEX} from '../../utils/regexConstants';

const AddExpensePage = () => {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [status, setStatus] = useState<Status>(Status.IDLE);

  const initialDate = to_YYYY_MM_DD(toUTC(new Date()));
  const [date, setDate] = useState(initialDate);

  const [editable, setEditable] = useState(false);

  const [activity] = useAtom(activityAtom);

  const {goBack} = useNavigation();

  const createExpense = () => {
    setStatus(Status.IN_PROGRESS);
    if (name !== '' && amount !== '') {
      return EXPENSE_API.create(name, amount, activity.id)
        .then(() => {
          setStatus(Status.SUCCESS);
          goBack();
        })
        .catch(() => setStatus(Status.ERROR));
    } else {
      setStatus(Status.IDLE);
    }
  };

  const reset = () => {
    Keyboard.dismiss();
    setName('');
    setAmount('');
    setEditable(false);
  };

  const endUpdate = () => {
    Keyboard.dismiss();
    setEditable(false);
  };

  const disabledButtons = name === '' || !AMOUNT_REGEX.test(amount);

  const render = () => {
    if (status === Status.IN_PROGRESS) {
      return <Loading />;
    } else if (status === Status.ERROR) {
      return <Error text="An error occurred while adding expense" />;
    } else {
      return (
        <>
          <View style={styles.container}>
            <NameInput
              text={name}
              onChangeText={setName}
              onTouchStart={() => setEditable(true)}
            />
            <AmountInput
              amount={amount}
              onChangeAmount={setAmount}
              onTouchStart={() => setEditable(true)}
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
          {editable ? (
            <View style={styles.buttonsContainer}>
              <CancelButton onPress={reset} />
              <ValidateButton
                onPress={endUpdate}
                disabled={disabledButtons}
                color={blue}
              />
            </View>
          ) : (
            <View style={styles.buttonsContainer}>
              <CancelButton onPress={goBack} />
              <ValidateButton
                onPress={createExpense}
                disabled={disabledButtons}
              />
            </View>
          )}
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
