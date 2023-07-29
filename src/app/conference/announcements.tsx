import { RootStackParamList } from "..";

import { ScrollView } from "react-native";
import { Text } from "react-native-paper";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ViewConferenceAnnouncements"
>;

export default function ViewConferenceAnnouncements({}: Props) {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Text>Announcements</Text>
    </ScrollView>
  );
}
