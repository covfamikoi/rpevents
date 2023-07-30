import { RootStackParamList } from "..";

import { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { List } from "react-native-paper";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { conferenceCollection } from "../../database";
import { Conference } from "../../models";

type Props = NativeStackScreenProps<RootStackParamList, "ViewConference">;

export default function ViewConference({ navigation, route }: Props) {
  const [conference, setConference] = useState<Conference>(
    route.params.conference,
  );
  const [refreshing, setRefreshing] = useState(false);

  async function refreshConference() {
    setRefreshing(true);
    try {
      await conferenceCollection
        .doc(route.params.conference.key)
        .get()
        .then((value) => setConference(value.data()!));
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshConference} />
      }
    >
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
