import React from 'react';
import {Icon} from 'react-native-elements';
import {black} from '../../themes/colors';
import {iSmall} from '../../themes/icons';

interface DeleteButtonProps {
  onPress: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({onPress}) => {
  return (
    <Icon
      reverse
      name="trash"
      type="font-awesome-5"
      onPress={onPress}
      size={iSmall}
      color={black}
    />
  );
};

export default DeleteButton;
