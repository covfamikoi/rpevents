import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Calendar from "../../components/calendar";

import { RootStackParamList } from "..";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ViewConferenceCalendar"
>;

export default function CalendarView({}: Props) {
  return <Calendar />;
}
