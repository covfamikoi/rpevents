import { useContext, useLayoutEffect, useMemo } from "react";
import { FlatList } from "react-native";
import { List, useTheme } from "react-native-paper";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ConferencesContext } from "../contexts/conferences";

import { RootStackParamList } from ".";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  const theme = useTheme();
  const conferences = useContext(ConferencesContext);

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
      ...[...conferences.values()].map((item) => {
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
  }, [conferences]);

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
      renderItem={(item) => item.item}
    />
  );
}
