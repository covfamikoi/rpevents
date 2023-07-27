import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";

import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { NavigationContainer } from "@react-navigation/native";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CustomAppBar from "./components/CustomAppBar";
import { Conference } from "./models";
import Home from "./pages/Home";
import ConferenceView from "./pages/conference/Conference";

export type RootStackParamList = {
  Home: undefined;
  Conference: { conference: Conference };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });
  const navigationTheme = colorScheme === "dark" ? DarkTheme : LightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          screenOptions={{
            header: (props) => <CustomAppBar {...props} />,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Conference"
            component={ConferenceView}
            options={({ route }) => ({
              title: route.params.conference.title,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </PaperProvider>
  );
}
