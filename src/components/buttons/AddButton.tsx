import React from 'react';
import {Icon} from 'react-native-elements';
import {green} from '../../themes/colors';
import {iSmall} from '../../themes/icons';

interface AddButtonProps {
  onPress: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({onPress}) => {
  return (
    <Icon
      reverse
      name="plus"
      type="font-awesome"
      onPress={onPress}
      size={iSmall}
      color={green}
    />
  );
};

export default AddButton;
