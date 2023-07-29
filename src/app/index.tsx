import { StatusBar } from "expo-status-bar";
import { Platform, useColorScheme } from "react-native";
import {
  IconButton,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";

import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import {
  NavigationContainer,
  NavigationProp,
  RouteProp,
} from "@react-navigation/native";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import Authentication from "./authentication";
import ViewConference from "./conference";
import ViewConferenceAnnouncements from "./conference/announcements";
import ViewConferenceCalendar from "./conference/calendar";
import ViewConferenceMap from "./conference/map";
import Home from "./home";
import NewConference from "./new";

import { Conference } from "../models";

export type RootStackParamList = {
  Home: undefined;
  NewConference: undefined;
  Authentication: undefined;
  ViewConference: { conference: Conference };
  ViewConferenceAnnouncements: { conference: Conference };
  ViewConferenceCalendar: { conference: Conference };
  ViewConferenceMap: { conference: Conference };
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
            onPress={() => navigation.navigate("Authentication")}
          />
        ),
      },
    };
  };
}

export default function Index() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
    materialLight: MD3LightTheme,
    materialDark: MD3DarkTheme,
  });
  const navigationTheme = colorScheme === "dark" ? DarkTheme : LightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navigationTheme}>
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
              title: route.params.conference.title,
              headerLargeTitle: true,
            }))}
          />
          <Stack.Screen
            component={ViewConferenceAnnouncements}
            name="ViewConferenceAnnouncements"
            options={withAccountButton(() => ({ title: "Announcements" }))}
          />
          <Stack.Screen
            component={ViewConferenceCalendar}
            name="ViewConferenceCalendar"
            options={withAccountButton(() => ({ title: "Calendar" }))}
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
            component={Authentication}
            name="Authentication"
            options={{ presentation: "modal", title: "Account" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}