import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { CalendarEvents, CalendarSheet } from "../../components";
import { CalendarProvider } from "../../components";

import { RootStackParamList } from "..";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ViewConferenceCalendar"
>;

export default function CalendarView({}: Props) {
  return (
    <CalendarProvider>
      <CalendarEvents />
      <CalendarSheet />
    </CalendarProvider>
  );
}
