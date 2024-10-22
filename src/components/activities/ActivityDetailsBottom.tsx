import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, Text} from 'react-native-elements';
import {ExpensesFilterIndex} from '../../enums/ExpensesFilterIndex';
import expensesAtom from '../../state/Expenses';
import {lightGrey} from '../../themes/colors';
import {sMedium, sSmall} from '../../themes/size';
import {formatAmount} from '../../utils/amountFormatter';
import ActionButton from '../buttons/ActionButton';
import ExpensesActionsFilter from '../expenses/ExpensesActionsFilter';
import ActivityDetailsActions from './ActivityDetailsActions';

interface ActivityDetailsBottomProps {
  expensesIndex: ExpensesFilterIndex;
  setExpensesIndex: (value: number) => void;
}

const ActivityDetailsBottom = ({
  expensesIndex,
  setExpensesIndex,
}: ActivityDetailsBottomProps) => {
  const [actionsVisible, setActionsVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const [expenses] = useAtom(expensesAtom);

  const TotalUserExpense = () => {
    let userTotal = 0;
    expenses.currentUser.map(
      (expense) => (userTotal += Number(expense.amount)),
    );
    return (
      <View style={styles.totalCurrentUser}>
        <Text>My total</Text>
        <Text>{formatAmount(userTotal)}</Text>
      </View>
    );
  };

  const TotalExpense = () => {
    let total = 0;
    expenses.all.map((expense) => (total += Number(expense.amount)));
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
    <>
      <Header
        containerStyle={styles.container}
        leftComponent={<TotalUserExpense />}
        centerComponent={<Actions />}
        rightComponent={<TotalExpense />}
      />
      <ActivityDetailsActions
        visible={actionsVisible}
        setVisible={setActionsVisible}
      />
      <ExpensesActionsFilter
        visible={filterVisible}
        setVisible={setFilterVisible}
        index={expensesIndex}
        setIndex={setExpensesIndex}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightGrey,
    paddingTop: sSmall,
    paddingBottom: sMedium,
  },
  totalCurrentUser: {
    paddingLeft: sSmall,
    alignItems: 'flex-start',
  },
  total: {
    paddingRight: sSmall,
    alignItems: 'flex-end',
  },
});

export default ActivityDetailsBottom;
