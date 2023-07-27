import { useState } from "react";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import { StackScreenProps } from "@react-navigation/stack";

import PublicConference from "../models/public_conference";
import { RootStackParamList } from "../../App";

type Props = StackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  let [data, setData] = useState<Array<PublicConference> | undefined>(
    undefined
  );
  let [refreshing, setRefreshing] = useState(false);

  async function refreshData(allowCache: boolean = true) {
    setRefreshing(true);
    let data;
    if (allowCache) {
      data = await PublicConference.get();
    } else {
      data = await PublicConference.fetch();
    }
    setData(data);
    setRefreshing(false);
  }

  if (data === undefined && !refreshing) {
    refreshData();
  }

  return (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
      }
      renderItem={(item) => (
        <List.Item
          title={item.item.title}
          onPress={() =>
            navigation.navigate("Conference", {
              publicConference: item.item,
            })
          }
        />
      )}
    />
  );
}
