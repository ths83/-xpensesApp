import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Header, Overlay, Text} from 'react-native-elements';
import Expense from '../../../model/Expense';
import Activity from '../../../model/Activity';

class ActivityDetailsBottom extends React.Component<{
  expenses: Expense[];
  activity: Activity;
  active: boolean;
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

  private renderLeft() {
    let userTotal = 0;
    this.props.expenses.map((expense) => {
      // TODO change by current user
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

  private renderRight() {
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

  // TODO resolve icon issue
  private renderCenter() {
    return (
      this.props.active && (
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
            <Button
              title="Add expense"
              onPress={() => {
                this.props.setVisible(false);
                this.props.navigation.navigate('AddExpense', {
                  activity: this.props.activity,
                });
              }}
            />
            {/* TODO add api call to end activity*/}
            <Button
              title="End activity"
              onPress={() => {
                this.props.setVisible(false);
                console.log('End activity clicked');
              }}
            />
            <Button
              title="Close"
              onPress={() => this.props.setVisible(false)}
            />
          </Overlay>
        </>
      )
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  return <ActivityDetailsBottom {...props} navigation={navigation} />;
}
