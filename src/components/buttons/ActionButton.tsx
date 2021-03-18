import React from 'react';
import {Icon} from 'react-native-elements';
import {red} from '../../themes/colors';
import {iSmall} from '../../themes/icons';

interface ActionButtonProps {
  onPress: () => void;
  onLongPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({onPress, onLongPress}) => {
  return (
    <Icon
      reverse
      name="ellipsis-h"
      type="font-awesome-5"
      onPress={onPress}
      onLongPress={onLongPress}
      size={iSmall}
      color={red}
    />
  );
};

export default ActionButton;
