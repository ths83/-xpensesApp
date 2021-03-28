import React, {useState} from 'react';
import {View} from 'react-native';
import {blue} from '../../themes/colors';
import CancelButton from '../buttons/CancelButton';
import DeleteButton from '../buttons/DeleteButton';
import ValidateButton from '../buttons/ValidateButton';
import DeletePopUp from '../popUp/DeletePopUp';
import {detailsStyle} from './styles';

interface ActionButtonsProps {
  editable: boolean;
  handleCancel: () => void;
  handleValidate: () => void;
  disabledValidate: boolean;
  handleUpdate: () => void;
  disabledUpdate: boolean;
  handleDelete: any;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  editable,
  handleCancel,
  handleValidate,
  disabledValidate,
  handleUpdate,
  disabledUpdate,
  handleDelete,
}) => {
  const [visible, setVisible] = useState(false);

  const closePopUp = () => setVisible(false);
  const displayPopUp = () => setVisible(true);

  return editable ? (
    <View style={detailsStyle.buttonsContainer}>
      <CancelButton onPress={handleCancel} />
      <ValidateButton
        onPress={handleValidate}
        color={blue}
        disabled={disabledValidate}
      />
    </View>
  ) : (
    <View style={detailsStyle.buttonsContainer}>
      <DeleteButton onPress={displayPopUp} />
      <ValidateButton onPress={handleUpdate} disabled={disabledUpdate} />
      <DeletePopUp
        isVisible={visible}
        onBackdropPress={closePopUp}
        handleCancel={closePopUp}
        handleValidate={() => {
          handleDelete();
          closePopUp();
        }}
      />
    </View>
  );
};

export default ActionButtons;
