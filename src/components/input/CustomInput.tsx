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
  onBlur,
  onTouchStart,
}) => {
  return (
    <Input
      placeholder={placeholder}
      leftIcon={leftIcon}
      defaultValue={defaultValue}
      errorMessage={errorMessage}
      onChangeText={onChangeText}
      style={styles.alignRight}
      errorStyle={styles.alignRight}
      keyboardType={keyboardType}
      onBlur={onBlur}
      onTouchStart={onTouchStart}
    />
  );
};

const styles = StyleSheet.create({
  alignRight: {
    textAlign: 'right',
  },
});

export default CustomInput;
