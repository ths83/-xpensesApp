import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {View} from 'react-native';
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
import {black, blue, dollar} from '../../themes/colors';
import {iMedium} from '../../themes/icons';
import {formatAmount} from '../../utils/amountFormatter';
import {toUTC, to_YYYY_MM_DD} from '../../utils/dateFormatter';
import {detailsStyle} from './styles';

const ActivityDetailsPage = () => {
  const [editable, setEditable] = useState(false);

  const [activity] = useAtom(activityAtom);
  const [expenses] = useAtom(expensesAtom);

  const [name, setName] = useState(activity.activityName);

  const [date, setDate] = useState(activity.startDate);

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
    expenses.all.map((expense) => (total += expense.amount));
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
      <Text>{activity.createdBy}</Text>
    </View>
  );

  const Calendar = () =>
    editable ? (
      <View style={detailsStyle.center}>
        <DatePicker
          date={date}
          onChange={(event: Event, selectedDate: Date | undefined) => {
            setDate(selectedDate ? to_YYYY_MM_DD(toUTC(selectedDate)) : date);
          }}
        />
      </View>
    ) : (
      <View style={(detailsStyle.rowCenter, detailsStyle.center)}>
        <Icon
          name="calendar"
          type="font-awesome-5"
          size={iMedium}
          color={black}
        />
        <Text>{activity.startDate}</Text>
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
          disabled={name === activity.activityName}
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
      <View style={detailsStyle.details}>
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
      </View>
      {activity.activityStatus === ActivityStatus.IN_PROGRESS ? (
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
      ) : (
        <Text style={detailsStyle.warning} h4>
          Activity closed
        </Text>
      )}
    </>
  );
};

export default ActivityDetailsPage;
