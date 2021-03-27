import React, {useState} from 'react';
import {AMOUNT_REGEX} from '../../utils/regexConstants';
import Input from './CustomInput';

interface AmountInputProps {
  amount: string;
  onChangeAmount: (value: string) => void;
  onTouchStart?: () => void;
}

const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  onChangeAmount,
  onTouchStart,
}) => {
  const [error, setError] = useState('');

  const handleAmount = () => {
    if (amount === '') {
      setError('Amount');
    } else if (!AMOUNT_REGEX.test(amount)) {
      setError('Digits & 1 period only');
    } else {
      setError('');
    }
  };

  return (
    <Input
      leftIcon={{type: 'font-awesome-5', name: 'money-bill'}}
      placeholder="Amount (CAD)"
      defaultValue={amount.toString()}
      onChangeText={(value) => onChangeAmount(value)}
      onBlur={handleAmount}
      onTouchStart={onTouchStart}
      errorMessage={error}
    />
  );
};

export default AmountInput;
