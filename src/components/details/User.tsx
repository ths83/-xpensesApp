import React from 'react';
import {View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {Activity} from '../../model/Activity';
import {blue} from '../../themes/colors';
import {iMedium} from '../../themes/icons';
import {detailsStyle} from './styles';

interface UserProps {
  username: string;
  activity: Activity;
}

const User: React.FC<UserProps> = ({username, activity}) => (
  <View style={(detailsStyle.rowCenter, detailsStyle.center)}>
    <Icon name="user" type="font-awesome-5" size={iMedium} color={blue} />
    <Text>{username === activity.createdBy ? 'Me' : activity.createdBy}</Text>
  </View>
);

export default User;
