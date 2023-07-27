import React, { useEffect, useMemo, useState } from "react";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { List, useTheme } from "react-native-paper";
import { StackScreenProps } from "@react-navigation/stack";

import { RootStackParamList } from "../App";
import { Conference } from "../models";
import { getConferences } from "../database";
import { useKnownPasswords } from "../global";
import { useAuthInfo } from "../hooks";
import { View } from "react-native";
import AddConference from "../components/AddConference";

type Props = StackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  const theme = useTheme();

  const [data, setData] = useState<Conference[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [addConf, setAddConf] = useState(false);

  const [knownPasswords, _setKnownPasswords] = useKnownPasswords();
  const [user, _admin] = useAuthInfo();

  const listItems = useMemo(() => {
    let items = [
      <List.Item
        titleStyle={{ color: theme.colors.primary }}
        title="Add Conference"
        onPress={() => setAddConf(true)}
        left={({ style }) => (
          <List.Icon icon="plus" color={theme.colors.primary} style={style} />
        )}
      />,
    ];
    items.push(
      ...data.map((item) => {
        return (
          <List.Item
            title={item.title}
            onPress={() => {
              navigation.navigate("Conference", { conference: item });
            }}
          />
        );
      }),
    );
    return items;
  }, [data]);

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

  useEffect(() => {
    refreshData();
  }, [user, knownPasswords]);

  return (
    <View style={{ flex: 1 }}>
      <AddConference
        navigation={navigation}
        visible={addConf}
        onClose={() => setAddConf(false)}
      />

      <FlatList
        data={listItems}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
        }
        renderItem={(item) => item.item}
      />
    </View>
  );
}
