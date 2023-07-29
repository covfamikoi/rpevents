import { ReactNode } from "react";
import { Button } from "react-native-paper";

interface TabButtonProps<T> {
  active: boolean;
  onPress: () => void;
  children: ReactNode;
}

export default function TabButton<T>({
  active,
  onPress,
  children,
}: TabButtonProps<T>) {
  return (
    <Button
      onPress={onPress}
      mode={active ? "contained-tonal" : "text"}
      style={{ marginHorizontal: 10 }}
    >
      {children}
    </Button>
  );
}
