import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import ActivitiesScreen from "./src/screens/ActivitiesScreen";
import AddActivityScreen from "./src/screens/AddActivityScreen";

const navigator = createStackNavigator(
  {
    Activities: ActivitiesScreen,
    AddActivity: AddActivityScreen,
  },
  {
    initialRouteName: "Activities",
    defaultNavigationOptions: {
      title: "xpensesApp",
    },
  },
);

export default createAppContainer(navigator);
