import { View } from "react-native";

import { useHeaderHeight } from "@react-navigation/elements";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Signin from "./signin";
import Signup from "./signup";

import { FocusAwareLightStatusBar } from "../../components";

const TabControl = createMaterialTopTabNavigator();

export default function Authentication() {
  const height = useHeaderHeight();

  return (
    <>
      <FocusAwareLightStatusBar />
      <View style={{ height: height }} />
      <TabControl.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "transparent" },
        }}
        style={{ flexGrow: 1 }}
      >
        <TabControl.Screen component={Signin} name="Sign In" />
        <TabControl.Screen component={Signup} name="Sign Up" />
      </TabControl.Navigator>
    </>
  );
}
