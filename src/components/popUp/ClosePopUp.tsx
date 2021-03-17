import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Icon, Overlay, Text} from 'react-native-elements';
import {blue, red} from '../../themes/colors';
import {iMedium} from '../../themes/icons';
import {sNormal, sSmall} from '../../themes/size';
import CancelButton from '../buttons/CancelButton';
import ValidateButton from '../buttons/ValidateButton';

interface ClosePopUpProps {
  isVisible: boolean;
  onBackdropPress: () => void;
  handleCancel: () => void;
  handleValidate: () => void;
}

const ClosePopUp: React.FC<ClosePopUpProps> = ({
  isVisible,
  onBackdropPress,
  handleCancel,
  handleValidate,
}) => (
  <Overlay isVisible={isVisible} onBackdropPress={onBackdropPress}>
    <Icon name="warning" type="font-awesome" size={iMedium} color={red} />
    <Text style={styles.text}>Are you sure to close this activity ?</Text>
    <Text style={(styles.text, styles.warning)}>
      THIS ACTION CANNOT BE UNDONE
    </Text>
    <Divider style={styles.divider} />
    <View style={styles.buttons}>
      <CancelButton onPress={handleCancel} />
      <ValidateButton onPress={handleValidate} />
    </View>
  </Overlay>
);

const styles = StyleSheet.create({
  text: {
    margin: sSmall,
  },
  warning: {
    color: red,
  },
  divider: {
    marginTop: sNormal,
    marginBottom: sNormal,
    margin: sSmall,
    backgroundColor: blue,
    height: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default memo(ClosePopUp);
