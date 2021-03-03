import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import expensesAtom from '../../state/Expenses';
import {lightGrey} from '../../themes/colors';
import {ilarge} from '../../themes/icons';
import {slarge, smedium} from '../../themes/size';
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

  const TotalUserExpense = () => {
    let userTotal = 0;
    expenses.currentUser.map((expense) => (userTotal += expense.amount));
    return (
      <>
        <View style={styles.userTotal}>
          <Text>My total</Text>
          <Text>{formatAmount(userTotal)}</Text>
        </View>
      </>
    );
  };

  const TotalExpense = () => {
    let total = 0;
    expenses.all.map((expense) => (total += expense.amount));
    return (
      <>
        <View style={styles.total}>
          <Text>Total</Text>
          <Text>{formatAmount(total)}</Text>
        </View>
      </>
    );
  };

  const Actions = () => (
    <>
      <Icon size={ilarge} name="info" onPress={() => setVisible(true)} />
    </>
  );

  return (
    <View style={styles.bottom}>
      <View style={styles.bottomContent}>
        <TotalUserExpense />
        <Actions />
        <TotalExpense />
      </View>
      <ActivityDetailsActions
        visible={visible}
        setVisible={setVisible}
        setExpensesIndex={setExpensesIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: lightGrey,
  },
  bottomContent: {
    marginBottom: slarge,
    marginTop: smedium,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userTotal: {
    paddingLeft: smedium,
    alignItems: 'flex-start',
  },
  total: {
    paddingRight: smedium,
    alignItems: 'flex-end',
  },
});
export default ActivityDetailsBottom;
