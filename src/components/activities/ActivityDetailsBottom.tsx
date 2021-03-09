import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import expensesAtom from '../../state/Expenses';
import {lightGrey} from '../../themes/colors';
import {sMedium, sNormal} from '../../themes/size';
import {formatAmount} from '../../utils/AmountFormatter';
import ActionButton from '../buttons/ActionButton';
import ExpensesActionsFilter from '../expenses/ExpensesActionsFilter';
import ActivityDetailsActions from './ActivityDetailsActions';

interface ActivityDetailsBottomProps {
  setExpensesIndex: (value: number) => void;
}

const ActivityDetailsBottom = ({
  setExpensesIndex,
}: ActivityDetailsBottomProps) => {
  const [actionsVisible, setActionsVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const [expenses] = useAtom(expensesAtom);

  const TotalUserExpense = () => {
    let userTotal = 0;
    expenses.currentUser.map((expense) => (userTotal += expense.amount));
    return (
      <View style={styles.userTotal}>
        <Text>My total</Text>
        <Text>{formatAmount(userTotal)}</Text>
      </View>
    );
  };

  const TotalExpense = () => {
    let total = 0;
    expenses.all.map((expense) => (total += expense.amount));
    return (
      <View style={styles.total}>
        <Text>Total</Text>
        <Text>{formatAmount(total)}</Text>
      </View>
    );
  };

  const Actions = () => (
    <ActionButton
      onPress={() => setActionsVisible(true)}
      onLongPress={() => setFilterVisible(true)}
    />
  );

  return (
    <View style={styles.bottom}>
      <View style={styles.bottomContent}>
        <TotalUserExpense />
        <Actions />
        <TotalExpense />
      </View>
      <ActivityDetailsActions
        visible={actionsVisible}
        setVisible={setActionsVisible}
      />
      <ExpensesActionsFilter
        visible={filterVisible}
        setVisible={setFilterVisible}
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
    marginBottom: sMedium,
    marginTop: sNormal,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userTotal: {
    paddingLeft: sNormal,
    alignItems: 'flex-start',
  },
  total: {
    paddingRight: sNormal,
    alignItems: 'flex-end',
  },
});

export default ActivityDetailsBottom;
