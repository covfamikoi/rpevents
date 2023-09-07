import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { CalendarEvents, CalendarSheet } from "../../components";
import { CalendarProvider } from "../../components";
import { useConferenceStream } from "../../contexts/conferenceStream";

import { RootStackParamList } from "..";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ViewConferenceCalendar"
>;

export default function CalendarView({ route, navigation }: Props) {
  const conference = useConferenceStream(route.params.conference, () =>
    navigation.goBack(),
  );

  return (
    <CalendarProvider>
      <CalendarSheet>
        <CalendarEvents events={conference.data.events} />
      </CalendarSheet>
    </CalendarProvider>
  );
}
