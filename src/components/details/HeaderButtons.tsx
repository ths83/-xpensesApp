import React from 'react';
import EditHeaderButtons from '../buttons/EditHeaderButtons';

interface HeaderButtonsProps {
  editable: boolean;
  handleBack: () => void;
  handleEdit: () => void;
}

const HeaderButtons: React.FC<HeaderButtonsProps> = ({
  editable,
  handleBack,
  handleEdit,
}) =>
  editable ? (
    <></>
  ) : (
    <EditHeaderButtons
      handleBackButton={handleBack}
      handleEditButton={handleEdit}
    />
  );

export default HeaderButtons;
