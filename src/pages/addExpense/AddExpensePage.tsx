import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {Keyboard, ScrollView, StyleSheet, View} from 'react-native';
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
import {sMedium, sNormal, sSmall} from '../../themes/size';
import {categories} from '../../utils/categoryConstants';
import {toUTC, to_YYYY_MM_DD} from '../../utils/dateFormatter';
import {AMOUNT_REGEX} from '../../utils/regexConstants';

const AddExpensePage = () => {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [status, setStatus] = useState<Status>(Status.IDLE);

  const defaultCategory = 'Other';
  const [category, setCategory] = useState<string>(defaultCategory);

  const initialDate = to_YYYY_MM_DD(toUTC(new Date()));
  const [date, setDate] = useState(initialDate);

  const [editable, setEditable] = useState(false);

  const [activity] = useAtom(activityAtom);

  const {goBack} = useNavigation();

  const createExpense = () => {
    setStatus(Status.IN_PROGRESS);
    if (name !== '' && amount !== '') {
      EXPENSE_API.create(name, amount, activity.id, date, category)
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

  const disableButtons = name === '' || !AMOUNT_REGEX.test(amount);

  const CategoryPicker = () => {
    return (
      <Picker
        enabled={editable} //TODO cannot be disabled
        selectedValue={category}
        onValueChange={item => setCategory(item)}
        mode="dropdown"
        style={styles.picker}>
        {categories.map(c => {
          <Picker.Item label={c.label} value={c.label} color={c.color} />;
        })}
      </Picker>
    );
  };

  return (
    <>
      {status === Status.IN_PROGRESS && <Loading />}
      {status === Status.ERROR && (
        <Error text="An error occurred while adding expense" />
      )}
      {status === Status.IDLE && (
        <>
          <ScrollView style={styles.container}>
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
            <CategoryPicker />
            <DatePicker date={date} onChange={setDate} />
          </ScrollView>
          {editable ? (
            <View style={styles.buttonsContainer}>
              <CancelButton onPress={reset} />
              <ValidateButton
                onPress={endUpdate}
                disabled={disableButtons}
                color={blue}
              />
            </View>
          ) : (
            <View style={styles.buttonsContainer}>
              <CancelButton onPress={goBack} />
              <ValidateButton
                onPress={createExpense}
                disabled={disableButtons}
              />
            </View>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: sMedium,
  },
  title: {
    margin: sMedium,
    marginBottom: sNormal,
  },
  picker: {
    marginBottom: sSmall,
    marginTop: sSmall,
  },
  buttonsContainer: {
    margin: sMedium,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddExpensePage;
