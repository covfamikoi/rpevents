import { ScrollView } from "react-native";
import { Text } from "react-native-paper";

export default function CalendarEvents() {
  const data = Array(50)
    .fill(0)
    .map((_, idx) => <Text key={idx}>Hello</Text>);
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">{data}</ScrollView>
  );
}
