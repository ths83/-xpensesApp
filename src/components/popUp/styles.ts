import {StyleSheet} from 'react-native';
import {blue, lightGrey, red} from '../../themes/colors';
import {sSmall, sNormal} from '../../themes/size';

export const popUpStyles = StyleSheet.create({
  text: {
    margin: sSmall,
  },
  red: {
    color: red,
  },
  divider: {
    marginTop: sNormal,
    marginBottom: sNormal,
    margin: sSmall,
    backgroundColor: blue,
    height: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lightGrey: {
    backgroundColor: lightGrey,
  },
});
