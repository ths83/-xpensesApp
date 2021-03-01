import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {Header, Icon, Text} from 'react-native-elements';
import expensesAtom from '../../state/Expenses';
import {formatAmount} from '../../utils/AmountFormatter';

import ActivityDetailsActions from './ActivityDetailsActions';

interface ActivityDetailsBottomProps {
  setExpensesIndex: (value: number) => void;
}

const ActivityDetailsBottom = ({
  setExpensesIndex,
}: ActivityDetailsBottomProps) => {
  const [visible, setVisible] = useState(false);

  const [expenses] = useAtom(expensesAtom);

  const renderTotalUserExpense = () => {
    let userTotal = 0;
    expenses.currentUser.map((expense) => (userTotal += expense.amount));
    return (
      <>
        <Text>My total</Text>
        <Text>{formatAmount(userTotal)}</Text>
      </>
    );
  };

  const renderTotalExpense = () => {
    let total = 0;
    expenses.all.map((expense) => (total += expense.amount));
    return (
      <>
        <Text>Total</Text>
        <Text>{formatAmount(total)}</Text>
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
      <ActivityDetailsActions
        visible={visible}
        setVisible={setVisible}
        setExpensesIndex={setExpensesIndex}
      />
    </>
  );
};

export default ActivityDetailsBottom;
