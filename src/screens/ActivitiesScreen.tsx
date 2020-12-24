import React from "react";
import { Button, Text } from "react-native";

const ActivitiesScreen = (props) => {
  return (
    <>
      <Text>Activities screen</Text>
      <Button title={"Add activity"} onPress={() => props.navigation.navigate("AddActivity")} />
    </>
  );
};

export default ActivitiesScreen;
