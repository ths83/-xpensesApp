import {ButtonGroup, Text} from 'react-native-elements';
import React from 'react';

export default class ActivityDetailsButtonGroup extends React.Component {
  render() {
    return (
      <ButtonGroup
        buttons={[
          {element: () => <Text>Expenses</Text>},
          {element: () => <Text>Balance</Text>},
        ]}
        onPress={() => console.log('clicked')} //TODO add action
      />
    );
  }
}
