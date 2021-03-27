import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {ACTIVITY_API} from '../../api/ActivityApi';
import CloseButton from '../../components/buttons/CloseButton';
import ClosePopUp from '../../components/popUp/ClosePopUp';
import {getUsers} from '../../config/UsersConfiguration';
import {ActivityStatus} from '../../enums/ActivityStatus';
import {Expense} from '../../model/Expense';
import activityAtom from '../../state/Activity';
import expensesAtom from '../../state/Expenses';
import userAtom from '../../state/User';
import {dollar} from '../../themes/colors';
import {iMedium} from '../../themes/icons';
import {sLarge, sNormal} from '../../themes/size';
import {formatAmount} from '../../utils/amountFormatter';

const ExpensesBalanceView = () => {
  const [username] = useAtom(userAtom);
  const [expenses] = useAtom(expensesAtom);
  const [activity] = useAtom(activityAtom);

  const [closePopUp, setClosePopUp] = useState(false);
  const {popToTop} = useNavigation();

  const users = getUsers();

  const sumAmounts = (userExpenses: Expense[]) =>
    userExpenses.length > 0
      ? userExpenses
          .map((expense) => expense.amount)
          .reduce((sum, current) => (sum += current))
      : 0;

  async function close() {
    ACTIVITY_API.close(activity.id).then(() => popToTop());
  }

  const render = () => {
    const currentUserAmount = sumAmounts(expenses.currentUser);
    const otherUserAmount = sumAmounts(expenses.otherUser);

    const currentUser = 'Me';
    const otherUser = users.filter((user) => user !== username)[0];

    let debtOwner = currentUser;
    let debtReceiver = otherUser;
    let ownerAmount = currentUserAmount;
    let receiverAmount = otherUserAmount;

    if (ownerAmount > receiverAmount) {
      debtOwner = otherUser;
      debtReceiver = currentUser;
      ownerAmount = otherUserAmount;
      receiverAmount = currentUserAmount;
    }

    if (ownerAmount === receiverAmount) {
      return (
        <View style={styles.container}>
          <Text h4>Everything is fine !</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text h4>
            {debtOwner} {'->'} {debtReceiver}
          </Text>
          <View style={styles.center}>
            <Icon
              name="money-bill"
              type="font-awesome-5"
              size={iMedium}
              color={dollar}
            />
            <Text h4>
              {formatAmount((receiverAmount - ownerAmount) / 2)} CAD
            </Text>
          </View>
          {activity.activityStatus === ActivityStatus.IN_PROGRESS && (
            <CloseButton onPress={() => setClosePopUp(true)} />
          )}
          <ClosePopUp
            isVisible={closePopUp}
            onBackdropPress={() => setClosePopUp(false)}
            handleCancel={() => setClosePopUp(false)}
            handleValidate={() => {
              close();
              setClosePopUp(false);
            }}
          />
        </View>
      );
    }
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    marginTop: sNormal,
    marginBottom: sLarge,
  },
});

export default ExpensesBalanceView;
