import { ScrollView } from "react-native";
import { List } from "react-native-paper";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useConferenceStream } from "../../contexts/conferenceStream";

import { RootStackParamList } from "..";

type Props = NativeStackScreenProps<RootStackParamList, "ViewConference">;

export default function ViewConference({ navigation, route }: Props) {
  const conference = useConferenceStream(
    route.params.conference,
    navigation.goBack,
  );

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <List.Item
        title="Announcements"
        left={(props) => <List.Icon icon="bullhorn-variant" {...props} />}
        onPress={() =>
          navigation.navigate("ViewConferenceAnnouncements", {
            conference: conference,
          })
        }
      />
      <List.Item
        title="Calendar"
        left={(props) => <List.Icon icon="calendar" {...props} />}
        onPress={() =>
          navigation.navigate("ViewConferenceCalendar", {
            conference: conference,
          })
        }
      />
      <List.Item
        title="Map"
        left={(props) => <List.Icon icon="map" {...props} />}
        onPress={() =>
          navigation.navigate("ViewConferenceMap", {
            conference: conference,
          })
        }
      />
    </ScrollView>
  );
}
