import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-elements';
import {ACTIVITY_API} from '../../api/ActivityApi';
import BackButton from '../../components/buttons/BackButton';
import ActionButtons from '../../components/details/ActionButtons';
import Amount from '../../components/details/Amount';
import Calendar from '../../components/details/Calendar';
import HeaderButtons from '../../components/details/HeaderButtons';
import User from '../../components/details/User';
import NameInput from '../../components/input/NameInput';
import {ActivityStatus} from '../../enums/ActivityStatus';
import {Currency} from '../../enums/Currency';
import activityAtom from '../../state/Activity';
import expensesAtom from '../../state/Expenses';
import userAtom from '../../state/User';
import {formatAmount} from '../../utils/amountFormatter';
import {formatDate} from '../../utils/dateFormatter';
import {detailsStyle} from './styles';

const ActivityDetailsPage = () => {
  const [editable, setEditable] = useState(false);

  const [username] = useAtom(userAtom);
  const [activity] = useAtom(activityAtom);
  const [expenses] = useAtom(expensesAtom);

  const [name, setName] = useState(activity.activityName);

  const [date, setDate] = useState(formatDate(activity.startDate));

  const {goBack, popToTop} = useNavigation();

  async function update() {
    ACTIVITY_API.update(activity.id, name, date).then(() => popToTop());
  }

  async function del() {
    ACTIVITY_API.delete(activity.id).then(() => popToTop());
  }

  const reset = () => {
    setName(activity.activityName);
    setEditable(false);
  };

  const endUpdate = () => {
    setEditable(false);
  };

  const expenseTotal = () => {
    let total = 0;
    expenses.all.map((expense) => (total += Number(expense.amount)));
    return formatAmount(total);
  };

  const Name = () => <Text h4>{name}</Text>;

  return (
    <>
      {activity.activityStatus === ActivityStatus.IN_PROGRESS ? (
        <HeaderButtons
          editable={editable}
          handleBack={goBack}
          handleEdit={() => setEditable(true)}
        />
      ) : (
        <View style={detailsStyle.backButton}>
          <BackButton onPress={goBack} />
        </View>
      )}
      <ScrollView style={detailsStyle.details}>
        <View style={detailsStyle.center}>
          {editable ? (
            <NameInput text={name} onChangeText={setName} />
          ) : (
            <Name />
          )}
        </View>
        <View style={detailsStyle.subDetails}>
          <User username={username} activity={activity} />
          <Amount amount={expenseTotal()} currency={Currency.CANADA} />
        </View>
        <Calendar editable={editable} date={date} onChange={setDate} />
      </ScrollView>
      {activity.activityStatus === ActivityStatus.IN_PROGRESS && (
        <>
          <ActionButtons
            editable={editable}
            handleCancel={reset}
            handleValidate={endUpdate}
            disabledValidate={name === ''}
            handleDelete={del}
            handleUpdate={update}
            disabledUpdate={
              name === activity.activityName &&
              formatDate(date) === formatDate(activity.startDate)
            }
          />
        </>
      )}
    </>
  );
};

export default ActivityDetailsPage;
