import { RootStackParamList } from "..";

import { ScrollView } from "react-native";
import { Text } from "react-native-paper";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ViewConferenceCalendar"
>;

export default function ViewConferenceCalendar({}: Props) {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Text>Calendar</Text>
    </ScrollView>
  );
}
