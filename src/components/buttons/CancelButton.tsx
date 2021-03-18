import React from 'react';
import {Icon} from 'react-native-elements';
import {red} from '../../themes/colors';
import {iSmall} from '../../themes/icons';

interface CancelButtonProps {
  onPress: () => void;
}

const CancelButton: React.FC<CancelButtonProps> = ({onPress}) => {
  return (
    <Icon
      reverse
      name="times"
      type="font-awesome-5"
      onPress={onPress}
      size={iSmall}
      color={red}
    />
  );
};

export default CancelButton;
