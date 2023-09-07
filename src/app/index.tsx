import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { IconButton } from "react-native-paper";

import { NavigationProp, RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import RootContextProvider from "../contexts";
import { Conference, Document } from "../models";

import ViewConference from "./conference";
import ViewConferenceAnnouncements from "./conference/announcements";
import ViewConferenceCalendar from "./conference/calendar";
import ViewConferenceMap from "./conference/map";
import Home from "./home";
import NewConference from "./new";
import UserModal from "./user";

export type RootStackParamList = {
  Home: undefined;
  NewConference: undefined;
  User: undefined;
  ViewConference: { conference: Document<Conference> };
  ViewConferenceAnnouncements: { conference: Document<Conference> };
  ViewConferenceCalendar: { conference: Document<Conference> };
  ViewConferenceMap: { conference: Document<Conference> };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props<name extends keyof RootStackParamList> = {
  route: RouteProp<RootStackParamList, name>;
  navigation: NavigationProp<RootStackParamList, name>;
};

function withAccountButton<name extends keyof RootStackParamList>(
  options: ({ route, navigation }: Props<name>) => NativeStackNavigationOptions,
): (props: Props<name>) => NativeStackNavigationOptions {
  return ({ route, navigation }: Props<name>) => {
    return {
      ...options({ route, navigation }),
      ...{
        headerRight: (_props) => (
          <IconButton
            icon="account"
            onPress={() => navigation.navigate("User")}
          />
        ),
      },
    };
  };
}

export default function Index() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootContextProvider>
        <StatusBar style="auto" animated={true} />
        <Stack.Navigator
          screenOptions={{
            headerTransparent: Platform.OS === "ios",
            headerBlurEffect: "regular",
          }}
        >
          <Stack.Screen
            component={Home}
            name="Home"
            options={withAccountButton(() => ({
              title: "Conferences",
              headerLargeTitle: true,
            }))}
          />
          <Stack.Screen
            component={ViewConference}
            name="ViewConference"
            options={withAccountButton(({ route }) => ({
              title: route.params.conference.data.title,
              headerLargeTitle: true,
            }))}
          />
          <Stack.Screen
            component={ViewConferenceAnnouncements}
            name="ViewConferenceAnnouncements"
            options={withAccountButton(() => ({
              title: "Announcements",
            }))}
          />
          <Stack.Screen
            component={ViewConferenceCalendar}
            name="ViewConferenceCalendar"
            options={withAccountButton(() => ({
              title: "Calendar",
            }))}
          />
          <Stack.Screen
            component={ViewConferenceMap}
            name="ViewConferenceMap"
            options={withAccountButton(() => ({ title: "Map" }))}
          />
          <Stack.Screen
            component={NewConference}
            name="NewConference"
            options={withAccountButton(() => ({
              presentation: "modal",
              title: "Add Conference",
            }))}
          />
          <Stack.Screen
            component={UserModal}
            name="User"
            options={{ presentation: "modal", title: "Account" }}
          />
        </Stack.Navigator>
      </RootContextProvider>
    </GestureHandlerRootView>
  );
}
