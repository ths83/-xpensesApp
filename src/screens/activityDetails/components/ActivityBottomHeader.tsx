import React from 'react';
import {Button, Header, Overlay, Text} from 'react-native-elements';
import Expense from '../../../model/Expense';

export default class ActivityBottomHeader extends React.Component<{
  expenses: Expense[];
  visible: boolean;
  setVisible: (value: ((prevState: boolean) => boolean) | boolean) => void;
}> {
  render() {
    return (
      <Header
        leftComponent={this.renderLeft()}
        centerComponent={this.renderCenter()}
        rightComponent={this.renderRight()}
      />
    );
  }

  renderLeft() {
    let userTotal = 0;
    this.props.expenses.map((expense) => {
      if (expense.userId === 'test') {
        userTotal += expense.amount;
      }
    });
    return (
      <>
        <Text>My total</Text>
        <Text>{userTotal}</Text>
      </>
    );
  }

  renderRight() {
    let total = 0;
    this.props.expenses.map((expense) => {
      total += expense.amount;
    });
    return (
      <>
        <Text>Total</Text>
        <Text>{total}</Text>
      </>
    );
  }

  renderCenter() {
    return (
      <>
        <Button
          onPress={() => this.props.setVisible(true)}
          icon={{
            name: 'arrow-right',
            size: 10,
            color: 'white',
          }}
        />
        <Overlay
          isVisible={this.props.visible}
          onBackdropPress={() => this.props.setVisible(false)}>
          {/* TODO add api call to add expense*/}
          <Button
            title="Add expense"
            onPress={() => console.log('Add expense clicked')}
          />
          {/* TODO add api call to end activity*/}
          <Button
            title="End activity"
            onPress={() => console.log('End activity clicked')}
          />
          <Button title="Close" onPress={() => this.props.setVisible(false)} />
        </Overlay>
      </>
    );
  }
}
