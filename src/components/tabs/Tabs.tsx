import { ReactNode } from "react";
import { View } from "react-native";

interface TabsProps {
  children: ReactNode;
}

export default function Tabs({ children }: TabsProps) {
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
