import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import HomeTab from "./HomeTab";
import MapTab from "./MapTab";
import CalendarTab from "./CalendarTab";
import SettingsTab from "./SettingsTab";

type Props = StackScreenProps<RootStackParamList, "Conference">;
const Tab = createMaterialBottomTabNavigator();

export default function Conference({}: Props) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{ tabBarIcon: "home" }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarTab}
        options={{ tabBarIcon: "calendar" }}
      />
      <Tab.Screen
        name="Map"
        component={MapTab}
        options={{ tabBarIcon: "map" }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsTab}
        options={{ tabBarIcon: "cog" }}
      />
    </Tab.Navigator>
  );
}
