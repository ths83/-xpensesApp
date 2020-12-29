import React, {useState} from 'react';
import {View} from 'react-native';
import ActivityDetailsHeader from '../activityDetails/components/ActivityDetailsHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Input} from 'react-native-elements';
import {useRoute} from '@react-navigation/native';
import {createExpense} from '../../api/ExpenseService';
import {TEST_USER} from '../../config/UsersConfiguration';

const CANADIAN_CURRENCY = 'CAD';

const AddExpenseScreen = () => {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const {params} = useRoute();

  const {activity} = params;

  return (
    <>
      <View>
        <ActivityDetailsHeader title={activity.name} />
      </View>
      <ScrollView>
        <Input placeholder="Name" onChangeText={(text) => setName(text)} />
        <Input
          placeholder="Amount"
          keyboardType={'decimal-pad'}
          onChangeText={(text) => setAmount(text)}
        />
        <Input
          placeholder="Currency"
          defaultValue={CANADIAN_CURRENCY}
          editable={false}
        />
      </ScrollView>
      <Button
        title={'Add expense'}
        onPress={() => {
          createExpense(
            name,
            amount,
            CANADIAN_CURRENCY,
            TEST_USER,
            activity.id,
          ); //TODO get user id from cognito
        }}
      />
    </>
  );
};

export default AddExpenseScreen;
