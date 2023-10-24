import { useEffect, useMemo } from "react";
import { FlatList } from "react-native";
import { List, Text } from "react-native-paper";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useConferenceStream } from "../../contexts/conferenceStream";
import { Announcement } from "../../models";

import { RootStackParamList } from "..";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ViewConferenceAnnouncements"
>;

export default function ViewConferenceAnnouncements({
  route,
  navigation,
}: Props) {
  const conference = useConferenceStream(route.params.conference, () =>
    navigation.goBack(),
  );
  const announcements = useMemo(() => {
    return conference.data.announcements.sort(
      (a, b) => b.postedAt.toMillis() - a.postedAt.toMillis(),
    );
  }, [conference.data.announcements]);

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={announcements}
      renderItem={(item) => <AnnouncementView item={item.item} />}
    />
  );
}

function AnnouncementView({ item }: { item: Announcement }) {
  return (
    <List.Item
      title={item.title}
      description={item.content}
      descriptionNumberOfLines={3}
      right={() => (
        <Text>
          {item.postedAt.toDate().toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </Text>
      )}
    />
  );
}
