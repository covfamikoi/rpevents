import { useHeaderHeight } from "@react-navigation/elements";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import CreateConference from "./create";
import JoinConference from "./join";

import { FocusAwareLightStatusBar } from "../../components";

const TabControl = createMaterialTopTabNavigator();

export default function NewConference() {
  const height = useHeaderHeight();

  return (
    <>
      <FocusAwareLightStatusBar />
      <TabControl.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "transparent", marginTop: height },
        }}
      >
        <TabControl.Screen name="Join" component={JoinConference} />
        <TabControl.Screen name="Create" component={CreateConference} />
      </TabControl.Navigator>
    </>
  );
}
