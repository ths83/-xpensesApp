import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {memo} from 'react';
import {EMPTY_ACTIVITY} from '../../model/Activity';
import activityAtom from '../../state/Activity';
import expensesAtom, {EMPTY_EXPENSES} from '../../state/Expenses';
import HomeButton from '../buttons/HomeButton';

const HomeHeaderComponent = () => {
  const [, setActivity] = useAtom(activityAtom);
  const [, setExpenses] = useAtom(expensesAtom);
  const {popToTop} = useNavigation();

  return (
    <HomeButton
      onPress={() => {
        popToTop();
        setExpenses(EMPTY_EXPENSES);
        setActivity(EMPTY_ACTIVITY);
      }}
    />
  );
};

export default memo(HomeHeaderComponent);
