import {StyleSheet} from 'react-native';
import {sMedium, sNormal} from '../../themes/size';

export const detailsStyle = StyleSheet.create({
  buttonsContainer: {
    margin: sMedium,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    marginBottom: sNormal,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
