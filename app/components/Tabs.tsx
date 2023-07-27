import { ReactNode } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

interface TabsProps {
  children: ReactNode;
}

export function Tabs({ children }: TabsProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      {children}
    </View>
  );
}

interface TabButtonProps<T> {
  value: T;
  tab: T;
  setTab: (arg0: T) => void;
  children: ReactNode;
}

export function TabButton<T>({
  value,
  tab,
  setTab,
  children,
}: TabButtonProps<T>) {
  return (
    <Button
      onPress={() => setTab(value)}
      mode={value === tab ? "contained-tonal" : "text"}
      style={{ marginHorizontal: 10 }}
    >
      {children}
    </Button>
  );
}
