import {ListItem} from 'react-native-elements';
import React, {useState} from 'react';
import Expense from '../../../../model/Expense';

interface ExpensesDetailsInterface {
  expenses: Expense[];
}

const ExpensesDetails = ({expenses}: ExpensesDetailsInterface) => {
  const [actionVisible, setActionVisible] = useState<boolean>(false);

  return (
    <>
      {expenses.map((expense, i) => (
        <ListItem
          key={i}
          bottomDivider
          onLongPress={() => setActionVisible(true)}>
          <ListItem.Content>
            <ListItem.Title>{expense.name}</ListItem.Title>
            <ListItem.Subtitle>Paid by {expense.userId}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Content right>
            <ListItem.Title>
              {expense.amount} {expense.currency}
            </ListItem.Title>
            {/*TODO format date => YYYY-MM-DD*/}
            <ListItem.Subtitle>{expense.date}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </>
  );

  // TODO expense action delete + update
  // private actionAlert() {
  //   return (
  //     <>
  //       <Overlay
  //         isVisible={this.props.updateIndicator}
  //         onBackdropPress={() => this.props.setUpdateIndicator(false)}>
  //         <Text>Hello from Overlay!</Text>
  //       </Overlay>
  //     </>
  //   );
  // }
};

export default ExpensesDetails;
