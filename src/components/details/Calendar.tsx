import React from 'react';
import {View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {black} from '../../themes/colors';
import {iMedium} from '../../themes/icons';
import {to_YYYY_MM_DD, getDateNow, formatDate} from '../../utils/dateFormatter';
import DatePicker from '../datePicker/CustomDatePicker';
import {detailsStyle} from './styles';

interface CalendarProps {
  editable: boolean;
  date: string;
  onChange: (value: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({editable, date, onChange}) =>
  editable ? (
    <View style={detailsStyle.center}>
      <DatePicker date={date} onChange={onChange} />
    </View>
  ) : (
    <View style={(detailsStyle.rowCenter, detailsStyle.center)}>
      <Icon
        name="calendar"
        type="font-awesome-5"
        size={iMedium}
        color={black}
      />
      <Text>
        {to_YYYY_MM_DD(getDateNow()) === formatDate(date)
          ? 'Today'
          : formatDate(date)}
      </Text>
    </View>
  );

export default Calendar;
