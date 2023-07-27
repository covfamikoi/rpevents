import { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import { StackScreenProps } from "@react-navigation/stack";

import { RootStackParamList } from "../App";
import { Conference } from "../models";
import { getConferences } from "../database";
import { useKnownPasswords, useUser } from "../global";

type Props = StackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  let [data, setData] = useState<Conference[] | null>(null);
  let [refreshing, setRefreshing] = useState(false);
  let [knownPasswords, _setKnownPasswords] = useKnownPasswords();
  let [user, _setUser] = useUser();

  async function refreshData() {
    if (refreshing) {
      return;
    }
    setRefreshing(true);
    try {
      const conferences = await getConferences(user, knownPasswords);
      setData(conferences);
    } finally {
      setRefreshing(false);
    }
  }

  if (data === null) {
    refreshData();
  }

  useEffect(() => {refreshData();}, [user]);

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
              conference: item.item,
            })
          }
        />
      )}
    />
  );
}
