import { Platform } from "react-native";

import { useHeaderHeight } from "@react-navigation/elements";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import CreateConference from "./create";
import JoinConference from "./join";

const TabControl = createMaterialTopTabNavigator();

export default function NewConference() {
  const height = useHeaderHeight();

  return (
    <>
      <TabControl.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "transparent",
            marginTop: Platform.OS === "ios" ? height : 0,
          },
        }}
      >
        <TabControl.Screen name="Join" component={JoinConference} />
        <TabControl.Screen name="Create" component={CreateConference} />
      </TabControl.Navigator>
    </>
  );
}
