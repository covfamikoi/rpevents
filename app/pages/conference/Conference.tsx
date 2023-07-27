import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";

import CalendarTab from "./CalendarTab";
import HomeTab from "./HomeTab";
import MapTab from "./MapTab";
import SettingsTab from "./SettingsTab";

import { RootStackParamList } from "../../App";

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
