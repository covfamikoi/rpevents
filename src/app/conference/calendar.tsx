import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Calendar from "../../components/calendar";
import DateProvider from "../../components/calendar/context";

import { RootStackParamList } from "..";

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
