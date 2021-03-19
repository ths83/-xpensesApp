import {StyleSheet} from 'react-native';
import {red, skyBlue} from '../../themes/colors';
import {sLarge, sMedium, sNormal} from '../../themes/size';

export const styles = StyleSheet.create({
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
  bottomButtons: {
    margin: sMedium,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomText: {
    margin: sLarge,
    textAlign: 'center',
    color: red,
  },
  centerItems: {
    alignItems: 'center',
    marginBottom: sNormal,
  },
  textIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    color: skyBlue,
  },
});
