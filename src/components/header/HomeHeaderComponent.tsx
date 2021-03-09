import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {memo} from 'react';
import {EMPTY_ACTIVITY} from '../../model/Activity';
import activityAtom from '../../state/Activity';
import HomeButton from '../buttons/HomeButton';

const HomeHeaderComponent = () => {
  const [, setActivity] = useAtom(activityAtom);

  const {popToTop} = useNavigation();

  return (
    <HomeButton
      onPress={() => {
        setActivity(EMPTY_ACTIVITY);
        popToTop();
      }}
    />
  );
};

export default memo(HomeHeaderComponent);
