import { RootStackParamList } from ".";

import {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { FlatList } from "react-native";
import { List, useTheme } from "react-native-paper";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { UserContext } from "../contexts";
import { getConferences } from "../database";
import { useKnownKeys } from "../global";
import { Conference } from "../models";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  const theme = useTheme();

  const [data, setData] = useState<Conference[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [knownKeys, _setKnownKeys] = useKnownKeys();
  const user = useContext(UserContext);

  const listItems = useMemo(() => {
    let items = [
      <List.Item
        titleStyle={{ color: theme.colors.primary }}
        title="Add Conference"
        onPress={() => navigation.navigate("NewConference")}
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
            onPress={() =>
              navigation.navigate("ViewConference", { conference: item })
            }
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
      const conferences = await getConferences(user, knownKeys);
      setData(conferences);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    refreshData();
  }, [user, knownKeys]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        // search bar options
      },
    });
  }, [navigation]);

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={listItems}
      refreshing={refreshing}
      onRefresh={refreshData}
      renderItem={(item) => item.item}
    />
  );
}
