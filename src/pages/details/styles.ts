import {StyleSheet} from 'react-native';
import {blue} from '../../themes/colors';
import {sMedium, sNormal} from '../../themes/size';

export const detailsStyle = StyleSheet.create({
  backButton: {
    margin: sMedium,
    marginBottom: 0,
  },
  details: {
    marginTop: sMedium,
    flex: 1,
    margin: sMedium,
  },
  subDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: sMedium,
  },
  center: {
    alignItems: 'center',
    marginBottom: sNormal,
  },
  blue: {
    color: blue,
  },
});
