import React from 'react';
import {Icon} from 'react-native-elements';
import {red} from '../../themes/colors';
import {iSmall} from '../../themes/icons';

interface ActionButtonProps {
  onPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({onPress}) => {
  return (
    <Icon
      reverse
      name="ellipsis-h"
      type="font-awesome"
      onPress={onPress}
      size={iSmall}
      color={red}
    />
  );
};

export default ActionButton;
