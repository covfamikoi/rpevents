import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { CalendarEvents, CalendarSheet } from "../../components";
import { CalendarProvider } from "../../components";

import { RootStackParamList } from "..";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ViewConferenceCalendar"
>;

export default function CalendarView({ route }: Props) {
  const conference = route.params.conference;

  return (
    <CalendarProvider>
      <CalendarSheet>
        <CalendarEvents events={conference.data.events} />
      </CalendarSheet>
    </CalendarProvider>
  );
}
