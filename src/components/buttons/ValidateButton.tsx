import React from 'react';
import {Icon} from 'react-native-elements';
import {green} from '../../themes/colors';
import {iSmall} from '../../themes/icons';

interface ValidateButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

const ValidateButton: React.FC<ValidateButtonProps> = ({onPress, disabled}) => {
  return (
    <Icon
      reverse
      name="check"
      type="font-awesome"
      onPress={onPress}
      size={iSmall}
      color={green}
      disabled={disabled}
    />
  );
};

export default ValidateButton;
