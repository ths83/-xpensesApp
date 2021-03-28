import React from 'react';
import {View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {dollar} from '../../themes/colors';
import {iMedium} from '../../themes/icons';
import {detailsStyle} from './styles';

interface AmountProps {
  amount: string;
  currency: string;
}

const Amount: React.FC<AmountProps> = ({amount, currency}) => (
  <View style={(detailsStyle.rowCenter, detailsStyle.center)}>
    <Icon
      name="money-bill"
      type="font-awesome-5"
      size={iMedium}
      color={dollar}
    />
    <Text>
      {amount} {currency}
    </Text>
  </View>
);

export default Amount;
