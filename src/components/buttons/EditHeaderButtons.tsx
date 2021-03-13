import React from 'react';
import {StyleSheet, View} from 'react-native';
import {sMedium} from '../../themes/size';
import BackButton from './BackButton';
import EditButton from './EditButton';

interface EditHeaderButtonsProps {
  handleBackButton: () => void;
  handleEditButton: () => void;
}

const EditHeaderButtons: React.FC<EditHeaderButtonsProps> = ({
  handleBackButton,
  handleEditButton,
}) => (
  <View style={styles.container}>
    <BackButton onPress={handleBackButton} />
    <EditButton onPress={handleEditButton} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: sMedium,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default EditHeaderButtons;
