import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {skyBlue} from '../../themes/colors';
import {iSmall} from '../../themes/icons';
import {sNormal, sSmall} from '../../themes/size';
import {toUTC} from '../../utils/DateFormatter';

interface CustomDatePickerProps {
  date: string;
  onChange: (event: Event, selectedDate: Date | undefined) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  date,
  onChange,
}) => {
  const [datePicker, setDatePicker] = useState(false);

  return (
    <>
      <View style={styles.data}>
        <Icon
          reverse
          name="calendar"
          type="font-awesome"
          size={iSmall}
          color={skyBlue}
          onPress={() => setDatePicker(true)}
        />
        <Text>{date}</Text>
      </View>
      {datePicker && (
        <DateTimePicker value={toUTC(new Date(date))} onChange={onChange} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: sSmall,
    marginBottom: sNormal,
  },
});

export default CustomDatePicker;
