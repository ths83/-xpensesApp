import React, {memo} from 'react';
import {View} from 'react-native';
import {Divider, Icon, Overlay, Text} from 'react-native-elements';
import {red} from '../../themes/colors';
import {iMedium} from '../../themes/icons';
import CancelButton from '../buttons/CancelButton';
import ValidateButton from '../buttons/ValidateButton';
import {popUpStyles} from './styles';

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
  <Overlay
    isVisible={isVisible}
    onBackdropPress={onBackdropPress}
    overlayStyle={popUpStyles.lightGrey}>
    <Icon name="coins" type="font-awesome-5" size={iMedium} color={red} />
    <Text style={popUpStyles.text}>
      Once paid you cannot update or delete the activity and associated
      expenses.
    </Text>
    <Text style={(popUpStyles.text, popUpStyles.red)}>
      THIS ACTION CANNOT BE UNDONE
    </Text>
    <Divider style={popUpStyles.divider} />
    <View style={popUpStyles.buttonsContainer}>
      <CancelButton onPress={handleCancel} />
      <ValidateButton onPress={handleValidate} />
    </View>
  </Overlay>
);

export default memo(ClosePopUp);
