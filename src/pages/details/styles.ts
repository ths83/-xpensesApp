import {StyleSheet} from 'react-native';
import {blue, red} from '../../themes/colors';
import {sLarge, sMedium, sNormal} from '../../themes/size';

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
  buttonsContainer: {
    margin: sMedium,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  warning: {
    margin: sLarge,
    textAlign: 'center',
    color: red,
  },
  center: {
    alignItems: 'center',
    marginBottom: sNormal,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blue: {
    color: blue,
  },
});
