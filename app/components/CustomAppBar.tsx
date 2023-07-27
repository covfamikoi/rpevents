import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { StackHeaderProps } from "@react-navigation/stack";
import { useState } from "react";

import AuthPopup from "./Auth";
import { useUser } from "../global";
import { View } from "react-native";

export default function CustomAppBar(props: StackHeaderProps) {
  const title = getHeaderTitle(props.options, props.route.name);
  const [adminPopup, setAdminPopup] = useState(false);
  const [user, _setUser] = useUser();

  return (
    <Appbar.Header mode="small">
      {props.back ? (
        <Appbar.BackAction onPress={props.navigation.goBack} />
      ) : null}
      <Appbar.Content title={title} />
      {user === null || true ? (
        <View>
          <Appbar.Action icon="account" onPress={() => setAdminPopup(true)} />
          <AuthPopup
            visible={adminPopup}
            onClose={() => setAdminPopup(false)}
          />
        </View>
      ) : (
        <View>
          <Appbar.Action icon="account" onPress={() => alert("todo")} />
        </View>
      )}
    </Appbar.Header>
  );
}
