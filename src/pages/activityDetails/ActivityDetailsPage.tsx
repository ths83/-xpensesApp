import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {Button, ScrollView, View} from 'react-native';
import {Input, Text} from 'react-native-elements';
import {ACTIVITY_API} from '../../api/ActivityApi';
import {Pages} from '../../enums/Pages';
import activityAtom from '../../state/Activity';
import {toYYYY_MM_DD} from '../../utils/DateFormatter';

const ActivityDetailsPage = () => {
  const [edit, setEdit] = useState(false);

  const [activity] = useAtom(activityAtom);

  const [name, setName] = useState(activity?.activityName);

  const {navigate, goBack} = useNavigation();

  async function update() {
    ACTIVITY_API.update(activity.id, name).then(() =>
      navigate(Pages.ACTIVITIES),
    );
  }

  async function del() {
    ACTIVITY_API.delete(activity.id).then(() => navigate(Pages.ACTIVITIES));
  }

  return (
    <>
      <ScrollView>
        {edit ? (
          <Input
            placeholder="Name"
            value={name}
            onChangeText={(value) => setName(value)}
          />
        ) : (
          <Text h3 onPress={() => setEdit(true)}>
            {activity?.activityName}
          </Text>
        )}
        <Text>Created by : {activity?.createdBy}</Text>
        <Text>Date : {toYYYY_MM_DD(activity?.startDate)}</Text>
        <Text>Number of expenses : {activity?.expenses?.length}</Text>
      </ScrollView>
      <View>
        <Button title={'Update'} onPress={update} />
        <Button title={'Delete'} onPress={del} />
        <Button title={'Back'} onPress={goBack} />
      </View>
    </>
  );
};

export default ActivityDetailsPage;
