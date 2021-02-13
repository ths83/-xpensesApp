import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {Header, Icon, Text} from 'react-native-elements';
import expensesAtom from '../../state/Expenses';
import userAtom from '../../state/User';
import ActivityDetailsActions from './ActivityDetailsActions';

const ActivityDetailsBottom = () => {
  const [visible, setVisible] = useState(false);

  const [expenses] = useAtom(expensesAtom);
  const [username] = useAtom(userAtom);

  const renderTotalUserExpense = () => {
    let userTotal = 0;
    expenses.map((expense) => {
      if (expense.user === username) {
        userTotal += expense.amount;
      }
    });
    return (
      <>
        <Text>My total</Text>
        <Text>{userTotal}</Text>
      </>
    );
  };

  const renderTotalExpense = () => {
    let total = 0;
    expenses.map((expense) => {
      total += expense.amount;
    });
    return (
      <>
        <Text>Total</Text>
        <Text>{total}</Text>
      </>
    );
  };

  const actions = (
    <>
      <Icon name="info" onPress={() => setVisible(true)} />
    </>
  );

  return (
    <>
      <Header
        leftComponent={renderTotalUserExpense()}
        centerComponent={actions}
        rightComponent={renderTotalExpense()}
      />
      <ActivityDetailsActions visible={visible} setVisible={setVisible} />
    </>
  );
};

export default ActivityDetailsBottom;
