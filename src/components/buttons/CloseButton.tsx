import React from 'react';
import {Icon} from 'react-native-elements';
import {green} from '../../themes/colors';
import {iSmall} from '../../themes/icons';

interface CloseButtonProps {
  onPress: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({onPress}) => {
  return (
    <Icon
      reverse
      name="credit-card"
      type="font-awesome"
      onPress={onPress}
      size={iSmall}
      color={green}
    />
  );
};

export default CloseButton;