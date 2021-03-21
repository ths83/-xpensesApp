import React, {memo} from 'react';
import {View} from 'react-native';
import {Divider, Icon, Overlay, Text} from 'react-native-elements';
import {red} from '../../themes/colors';
import {iMedium} from '../../themes/icons';
import CancelButton from '../buttons/CancelButton';
import ValidateButton from '../buttons/ValidateButton';
import {popUpStyles} from './styles';

interface LogoutPopUpProps {
  isVisible: boolean;
  onBackdropPress: () => void;
  handleCancel: () => void;
  handleValidate: () => void;
}

const LogoutPopUp: React.FC<LogoutPopUpProps> = ({
  isVisible,
  onBackdropPress,
  handleCancel,
  handleValidate,
}) => (
  <Overlay
    isVisible={isVisible}
    onBackdropPress={onBackdropPress}
    overlayStyle={popUpStyles.lightGrey}>
    <Icon
      name="sign-out-alt"
      type="font-awesome-5"
      size={iMedium}
      color={red}
    />
    <Text style={popUpStyles.text}>Are you sure to sign out ?</Text>
    <Divider style={popUpStyles.divider} />
    <View style={popUpStyles.buttonsContainer}>
      <CancelButton onPress={handleCancel} />
      <ValidateButton onPress={handleValidate} />
    </View>
  </Overlay>
);

export default memo(LogoutPopUp);
