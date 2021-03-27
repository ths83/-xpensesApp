import React, {useState} from 'react';
import Input from './CustomInput';

interface NameInputProps {
  text: string;
  onChangeText: (value: string) => void;
  onTouchStart?: () => void;
}

const NameInput: React.FC<NameInputProps> = ({
  text,
  onChangeText,
  onTouchStart,
}) => {
  const [error, setError] = useState('');

  const handleText = () => {
    text === '' ? setError('Name') : setError('');
  };

  return (
    <Input
      leftIcon={{type: 'font-awesome-5', name: 'heading'}}
      placeholder="Name"
      defaultValue={text}
      onChangeText={(value) => onChangeText(value)}
      onBlur={handleText}
      onTouchStart={onTouchStart}
      errorMessage={error}
    />
  );
};

export default NameInput;
