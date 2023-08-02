import { View } from "react-native";

import { useHeaderHeight } from "@react-navigation/elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Calendar from "../../components/calendar";

import { RootStackParamList } from "..";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ViewConferenceCalendar"
>;

export default function CalendarView({}: Props) {
  const height = useHeaderHeight();

  return (
    <>
      {/* <View style={{ height: height }} /> */}
      <Calendar />
    </>
  );
}
