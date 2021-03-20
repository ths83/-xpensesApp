import {StyleSheet} from 'react-native';
import {blue, red} from '../../themes/colors';
import {sLarge, sMedium, sNormal} from '../../themes/size';

export const detailsStyle = StyleSheet.create({
  backButton: {
    margin: sMedium,
    marginBottom: 0,
  },
  details: {
    flex: 1,
    margin: sMedium,
    marginTop: 0,
    justifyContent: 'center',
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
  bottomText: {
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
