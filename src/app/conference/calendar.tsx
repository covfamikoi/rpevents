import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Calendar from "../../components/calendar";

import { RootStackParamList } from "..";
import DateProvider from "../../components/calendar/context";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ViewConferenceCalendar"
>;

export default function CalendarView({}: Props) {
  return (
    <DateProvider>
      <Calendar />
    </DateProvider>
  );
}
