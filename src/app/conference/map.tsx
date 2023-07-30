import { RootStackParamList } from "..";

import { ScrollView } from "react-native";
import { Text } from "react-native-paper";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "ViewConferenceMap">;

export default function ViewConferenceMap({}: Props) {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Text>Maps</Text>
    </ScrollView>
  );
}
