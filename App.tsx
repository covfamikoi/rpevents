import {} from "./firebaseConfig";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import { useColorScheme } from "react-native";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

import Home from "./app/pages/Home";
import CustomAppBar from "./app/components/CustomAppBar";
import Conference from "./app/pages/conference/Conference";
import PublicConference from "./app/models/public_conference";

export type RootStackParamList = {
  Home: undefined;
  Conference: { publicConference: PublicConference };
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
            component={Conference}
            options={({ route }) => ({
              title: route.params.publicConference.title,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </PaperProvider>
  );
}
