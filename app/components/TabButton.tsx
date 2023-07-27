import { ReactNode } from "react";
import { Button } from "react-native-paper";

interface Props {
  value: string;
  tab: string;
  setTab: (arg0: string) => void;
  children: ReactNode;
}

export default function TabButton({ value, tab, setTab, children }: Props) {
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
