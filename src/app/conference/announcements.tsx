import { RootStackParamList } from "..";

import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ConfKeyTextInput } from "../../components";

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
