import React from 'react';
import {Icon} from 'react-native-elements';
import {blue} from '../../themes/colors';
import {iSmall} from '../../themes/icons';

interface EditButtonProps {
  onPress: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({onPress}) => {
  return (
    <Icon
      reverse
      name="edit"
      type="font-awesome"
      onPress={onPress}
      size={iSmall}
      color={blue}
    />
  );
};

export default EditButton;
