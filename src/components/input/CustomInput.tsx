import React from 'react';
import {StyleSheet} from 'react-native';
import {Input, InputProps} from 'react-native-elements';

const CustomInput: React.FC<InputProps> = ({
  placeholder,
  leftIcon,
  defaultValue,
  onChangeText,
  errorMessage,
  keyboardType,
}) => {
  return (
    <Input
      placeholder={placeholder}
      leftIcon={leftIcon}
      defaultValue={defaultValue}
      errorMessage={errorMessage}
      onChangeText={onChangeText}
      style={styles.input}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    textAlign: 'right',
  },
});

export default CustomInput;
