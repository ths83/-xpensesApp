import {ButtonGroup, Text} from 'react-native-elements';
import React from 'react';

export default class ActivityDetailsTab extends React.Component<{
  index: number;
  setIndex: (value: number) => void;
}> {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: this.props.index,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  private updateIndex(selectedIndex: number) {
    this.setState({selectedIndex});
    this.props.setIndex(selectedIndex);
  }

  render() {
    const {selectedIndex} = this.state;
    return (
      <ButtonGroup
        buttons={[
          {element: () => <Text>Expenses</Text>},
          {element: () => <Text>Balance</Text>},
        ]}
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
      />
    );
  }
}
