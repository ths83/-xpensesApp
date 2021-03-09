import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import expensesAtom from '../../state/Expenses';
import {blue, darkGreen, green, grey, lightGrey} from '../../themes/colors';
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
      <View style={styles.totalCurrentUser}>
        <Text style={styles.text}>My total</Text>
        <Text style={styles.text}>{formatAmount(userTotal)}</Text>
      </View>
    );
  };

  const TotalExpense = () => {
    let total = 0;
    expenses.all.map((expense) => (total += expense.amount));
    return (
      <View style={styles.total}>
        <Text style={styles.text}>Total</Text>
        <Text style={styles.text}>{formatAmount(total)}</Text>
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
    <View style={styles.container}>
      <View style={styles.containerContent}>
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
  container: {
    backgroundColor: lightGrey,
  },
  containerContent: {
    marginBottom: sMedium,
    marginTop: sNormal,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalCurrentUser: {
    paddingLeft: sNormal,
    alignItems: 'flex-start',
  },
  text: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: 15,
  },
  total: {
    paddingRight: sNormal,
    alignItems: 'flex-end',
  },
});

export default ActivityDetailsBottom;
