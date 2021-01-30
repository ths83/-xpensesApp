import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {Button, Input, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {activityAtom} from '../../../App';
import {EXPENSE_API} from '../../api/ExpenseApi';
import {Currency} from '../../commons/enums/Currency';
import {Status} from '../../commons/enums/Status';

const AddExpensePage = () => {
  const [name, setName] = useState<string>('');
  const [errorName, setErrorName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [errorAmount, setErrorAmount] = useState<string>('');
  const [status, setStatus] = useState<Status>(Status.IDLE);

  const [activity] = useAtom(activityAtom);

  const {navigate} = useNavigation();

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

  function handleAddExpense() {
    setStatus(Status.IN_PROGRESS);
    const nameValue = isValidName();
    const amountValue = isValidAmount();
    if (nameValue && amountValue) {
      return EXPENSE_API.create(name, amount, activity.id)
        .then(() => {
          console.debug(
            `Successfully added new expense to activity '${activity.id}'`,
          );
          setStatus(Status.SUCCESS);
          navigate('ActivityDetails');
        })
        .catch((error) => {
          console.debug(error);
          setStatus(Status.ERROR);
        });
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
        {status === Status.SUCCESS && (
          <Text>
            Successfully added new expense to activity {activity.name}
          </Text>
        )}
        {status === Status.ERROR && (
          <Text>An error occurred while adding expense to {activity.name}</Text>
        )}
      </ScrollView>
      <Button title={'Add expense'} onPress={handleAddExpense} />
    </>
  );
};

export default AddExpensePage;
