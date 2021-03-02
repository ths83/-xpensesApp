import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {memo} from 'react';
import {Icon} from 'react-native-elements';
import {EMPTY_ACTIVITY} from '../../model/Activity';
import activityAtom from '../../state/Activity';
import {white} from '../../themes/colors';
import {imedium} from '../../themes/icons';

const HomeHeaderComponent = () => {
  const [, setActivity] = useAtom(activityAtom);

  const {popToTop} = useNavigation();

  return (
    <Icon
      size={imedium}
      color={white}
      name="home"
      onPress={() => {
        setActivity(EMPTY_ACTIVITY);
        popToTop();
      }}
    />
  );
};

export default memo(HomeHeaderComponent);
