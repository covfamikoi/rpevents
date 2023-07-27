import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { StackHeaderProps } from "@react-navigation/stack";
import { useState } from "react";
import AuthPopup from "./Auth";

export default function CustomAppBar(props: StackHeaderProps) {
  const title = getHeaderTitle(props.options, props.route.name);
  const [adminPopup, setAdminPopup] = useState(false);

  return (
    <Appbar.Header mode="small">
      {props.back ? (
        <Appbar.BackAction onPress={props.navigation.goBack} />
      ) : null}
      <Appbar.Content title={title} />
      <Appbar.Action icon="account" onPress={() => setAdminPopup(true)} />
      <AuthPopup visible={adminPopup} onClose={() => setAdminPopup(false)} />
    </Appbar.Header>
  );
}
