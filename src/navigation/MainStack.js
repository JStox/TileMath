import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Root from "../screens/Root";
import LevelMenu from "../screens/LevelMenu";
import Level from "../screens/Level";

const MainStack = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator
      initialRouteName="Root"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <HomeStack.Screen name="Root" component={Root}></HomeStack.Screen>
      <HomeStack.Screen
        name="LevelMenu"
        component={LevelMenu}
      ></HomeStack.Screen>
      <HomeStack.Screen name="Level" component={Level}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

export default MainStack;
