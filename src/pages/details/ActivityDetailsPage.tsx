import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {ACTIVITY_API} from '../../api/ActivityApi';
import BackButton from '../../components/buttons/BackButton';
import CancelButton from '../../components/buttons/CancelButton';
import DeleteButton from '../../components/buttons/DeleteButton';
import EditHeaderButtons from '../../components/buttons/EditHeaderButtons';
import ValidateButton from '../../components/buttons/ValidateButton';
import DatePicker from '../../components/datePicker/CustomDatePicker';
import NameInput from '../../components/input/NameInput';
import DeletePopUp from '../../components/popUp/DeletePopUp';
import {ActivityStatus} from '../../enums/ActivityStatus';
import {Currency} from '../../enums/Currency';
import activityAtom from '../../state/Activity';
import expensesAtom from '../../state/Expenses';
import userAtom from '../../state/User';
import {black, blue, dollar} from '../../themes/colors';
import {iMedium} from '../../themes/icons';
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

  const [deletePopUp, setDeletePopUp] = useState(false);

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

  const HeaderButtons = () =>
    editable ? (
      <></>
    ) : (
      <EditHeaderButtons
        handleBackButton={goBack}
        handleEditButton={() => setEditable(true)}
      />
    );

  const Name = () => <Text h4>{activity.activityName}</Text>;

  const Amount = () => (
    <View style={(detailsStyle.rowCenter, detailsStyle.center)}>
      <Icon
        name="money-bill"
        type="font-awesome-5"
        size={iMedium}
        color={dollar}
      />
      <Text>
        {expenseTotal()} {Currency.CANADA}
      </Text>
    </View>
  );

  const User = () => (
    <View style={(detailsStyle.rowCenter, detailsStyle.center)}>
      <Icon name="user" type="font-awesome-5" size={iMedium} color={blue} />
      <Text>{username === activity.createdBy ? 'Me' : activity.createdBy}</Text>
    </View>
  );

  const Calendar = () =>
    editable ? (
      <View style={detailsStyle.center}>
        <DatePicker date={date} onChange={setDate} />
      </View>
    ) : (
      <View style={(detailsStyle.rowCenter, detailsStyle.center)}>
        <Icon
          name="calendar"
          type="font-awesome-5"
          size={iMedium}
          color={black}
        />
        <Text>{formatDate(date)}</Text>
      </View>
    );

  const BottomButtons = () =>
    editable ? (
      <View style={detailsStyle.buttonsContainer}>
        <CancelButton onPress={reset} />
        <ValidateButton
          onPress={endUpdate}
          color={blue}
          disabled={name === ''}
        />
      </View>
    ) : (
      <View style={detailsStyle.buttonsContainer}>
        <DeleteButton onPress={() => setDeletePopUp(true)} />
        <ValidateButton
          onPress={update}
          disabled={
            name === activity.activityName &&
            formatDate(date) === formatDate(activity.startDate)
          }
        />
      </View>
    );

  return (
    <>
      {activity.activityStatus === ActivityStatus.IN_PROGRESS ? (
        <HeaderButtons />
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
          <User />
          <Amount />
        </View>
        <Calendar />
      </ScrollView>
      {activity.activityStatus === ActivityStatus.IN_PROGRESS && (
        <>
          <BottomButtons />
          <DeletePopUp
            isVisible={deletePopUp}
            onBackdropPress={() => setDeletePopUp(false)}
            handleCancel={() => setDeletePopUp(false)}
            handleValidate={() => {
              del();
              setDeletePopUp(false);
            }}
          />
        </>
      )}
    </>
  );
};

export default ActivityDetailsPage;
