import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Icon, Text} from 'react-native-elements';
import {blue} from '../../themes/colors';
import {iSmall} from '../../themes/icons';
import {sNormal, sSmall} from '../../themes/size';
import {toUTC, to_YYYY_MM_DD} from '../../utils/dateFormatter';
import CancelButton from '../buttons/CancelButton';
import ValidateButton from '../buttons/ValidateButton';

interface CustomDatePickerProps {
  date: string;
  onChange: (value: string) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  date,
  onChange,
}) => {
  const defaultDate = toUTC(new Date(date));
  const [value, setValue] = useState<Date>(defaultDate);
  const [datePicker, setDatePicker] = useState(false);

  return (
    <>
      {datePicker ? (
        <View style={styles.center}>
          <DatePicker
            date={value}
            mode="date"
            androidVariant="nativeAndroid"
            textColor={blue}
            onDateChange={selectedDate => setValue(toUTC(selectedDate))}
          />
          <View style={styles.datePickerButtons}>
            <CancelButton
              onPress={() => {
                setValue(defaultDate);
                setDatePicker(false);
              }}
            />
            <ValidateButton
              onPress={() => {
                onChange(to_YYYY_MM_DD(value));
                setDatePicker(false);
              }}
              color={blue}
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Icon
            reverse
            name="calendar"
            type="font-awesome-5"
            size={iSmall}
            color={blue}
            onPress={() => setDatePicker(true)}
          />
          <Text style={styles.bold}>{to_YYYY_MM_DD(value)}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: sNormal,
  },
  bold: {
    fontWeight: 'bold',
  },
  center: {
    alignItems: 'center',
  },
  datePickerButtons: {
    marginTop: sSmall,
    flexDirection: 'row',
  },
});

export default CustomDatePicker;
