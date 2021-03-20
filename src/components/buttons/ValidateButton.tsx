import React from 'react';
import {Icon} from 'react-native-elements';
import {green} from '../../themes/colors';
import {iSmall} from '../../themes/icons';

interface ValidateButtonProps {
  onPress: () => void;
  disabled?: boolean;
  color?: string;
}

const ValidateButton: React.FC<ValidateButtonProps> = ({
  onPress,
  disabled,
  color,
}) => {
  return (
    <Icon
      reverse
      name="check"
      type="font-awesome-5"
      onPress={onPress}
      size={iSmall}
      color={color ? color : green}
      disabled={disabled}
    />
  );
};

export default ValidateButton;
