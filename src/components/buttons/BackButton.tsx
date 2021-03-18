import React from 'react';
import {Icon} from 'react-native-elements';
import {red} from '../../themes/colors';
import {iSmall} from '../../themes/icons';

interface BackButtonProps {
  onPress: () => void;
}

const CancelButton: React.FC<BackButtonProps> = ({onPress}) => {
  return (
    <Icon
      reverse
      name="arrow-left"
      type="font-awesome-5"
      onPress={onPress}
      size={iSmall}
      color={red}
    />
  );
};

export default CancelButton;
