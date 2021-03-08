import React from 'react';
import {Icon} from 'react-native-elements';
import {green} from '../../themes/colors';
import {iSmall} from '../../themes/icons';

interface ValidateButtonProps {
  onPress: () => void;
}

const ValidateButton: React.FC<ValidateButtonProps> = ({onPress}) => {
  return (
    <Icon
      reverse
      name="check"
      type="font-awesome"
      onPress={onPress}
      size={iSmall}
      color={green}
    />
  );
};

export default ValidateButton;
