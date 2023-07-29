import { StatusBar } from "expo-status-bar";

import { useIsFocused } from "@react-navigation/native";

export default function FocusAwareLightStatusBar() {
  /// something is broken, meaning that the status bar is unreadable in light-mode
  /// when a modal is open (white on white). This fixes that, though not perfectly.

  const focused = useIsFocused();

  return focused ? <StatusBar style="light" animated={true} /> : null;
}
