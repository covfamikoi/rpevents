import { RootStackParamList } from "..";

import { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RemoveConferencesContext } from "../../contexts/conferences";
import { conferenceCollection } from "../../database";
import { Conference } from "../../models";

type Props = NativeStackScreenProps<RootStackParamList, "ViewConference">;

export default function ViewConference({ navigation, route }: Props) {
  const removeConferences = useContext(RemoveConferencesContext);
  const [conference, setConference] = useState<Conference>(
    route.params.conference,
  );

  useEffect(() => {
    return conferenceCollection.doc(conference.key).onSnapshot({
      next: (doc) => {
        const data = doc.data();
        if (data === undefined) {
          navigation.goBack();
          removeConferences([doc.id]);
        } else {
          setConference(data);
        }
      },
    });
  }, [conference.key]);

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
