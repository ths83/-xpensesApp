import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {Button, Input, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {EXPENSE_API} from '../../api/ExpenseApi';
import {Currency} from '../../enums/Currency';
import {Status} from '../../enums/Status';
import activityAtom from '../../state/activity';

const AddExpensePage = () => {
  const [name, setName] = useState<string>('');
  const [errorName, setErrorName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [errorAmount, setErrorAmount] = useState<string>('');
  const [status, setStatus] = useState<Status>(Status.IDLE);

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

  return (
    <>
      <ScrollView>
        <Input
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          errorMessage={errorName}
        />
        <Input
          placeholder="Amount"
          keyboardType={'decimal-pad'}
          onChangeText={(text) => setAmount(text)}
          errorMessage={errorAmount}
        />
        <Input
          placeholder="Currency"
          defaultValue={Currency.CANADA}
          editable={false} //TODO v2
        />
        {status === Status.ERROR && (
          <Text>An error occurred while adding expense</Text>
        )}
      </ScrollView>
      <Button title={'Add expense'} onPress={createExpense} />
    </>
  );
};

export default AddExpensePage;
