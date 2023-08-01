import Fuse from "fuse.js";
import { useContext, useEffect, useMemo, useState } from "react";
import { FlatList } from "react-native";
import { List, useTheme } from "react-native-paper";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  ConferencesContext,
  RefreshConferencexContext,
} from "../contexts/conferences";

import { RootStackParamList } from ".";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  const theme = useTheme();

  const refreshConferences = useContext(RefreshConferencexContext);
  const [refreshing, setRefreshing] = useState(false);

  const conferences = useContext(ConferencesContext);
  const fuse = useMemo(
    () => new Fuse(conferences, { keys: ["data.title"] }),
    [conferences],
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (text) => setSearch(text.nativeEvent.text),
      },
    });
  }, [navigation]);

  const listItems = useMemo(() => {
    let items = [];
    let toPush;

    if (search === "") {
      items.push(
        <List.Item
          titleStyle={{ color: theme.colors.primary }}
          title="Add Conference"
          onPress={() => navigation.navigate("NewConference")}
          left={({ style }) => (
            <List.Icon icon="plus" color={theme.colors.primary} style={style} />
          )}
        />,
      );
      toPush = conferences;
    } else {
      toPush = fuse.search(search).map((item) => item.item);
    }

    items.push(
      ...toPush.map((item) => {
        return (
          <List.Item
            title={item.data.title}
            onPress={() =>
              navigation.navigate("ViewConference", { conference: item })
            }
          />
        );
      }),
    );

    return items;
  }, [conferences, search, fuse]);

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={listItems}
      renderItem={(item) => item.item}
      refreshing={refreshing}
      onRefresh={() => {
        setRefreshing(true);
        refreshConferences().then(() => setRefreshing(false));
      }}
    />
  );
}
