import { Appbar, Divider, Menu } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { StackHeaderProps } from "@react-navigation/stack";
import { useState } from "react";
import { View } from "react-native";

import AuthPopup from "./Auth";
import { fireAuth } from "../firebaseConfig";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { useAuthInfo } from "../hooks";

export default function CustomAppBar(props: StackHeaderProps) {
  const title = getHeaderTitle(props.options, props.route.name);
  const [adminPopup, setAdminPopup] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [user, _admin] = useAuthInfo();

  return (
    <Appbar.Header mode="small">
      {props.back ? (
        <Appbar.BackAction onPress={props.navigation.goBack} />
      ) : null}
      <Appbar.Content title={title} />
      {user === null ? (
        <View>
          <Appbar.Action icon="account" onPress={() => setAdminPopup(true)} />
          <AuthPopup
            visible={adminPopup}
            onClose={() => setAdminPopup(false)}
          />
        </View>
      ) : (
        <View>
          <Menu
            visible={userMenu}
            onDismiss={() => setUserMenu(false)}
            anchor={
              <Appbar.Action icon="account" onPress={() => setUserMenu(true)} />
            }
          >
            <Menu.Item
              title={user.email}
              disabled={true}
              leadingIcon="account"
              dense={true}
            />
            <Divider style={{ marginVertical: 8 }} />
            <Menu.Item onPress={() => signOut(fireAuth)} title="Sign Out" />
            <Menu.Item
              onPress={() => {
                sendPasswordResetEmail(fireAuth, user.email!).then(() => {
                  setUserMenu(false);
                  alert("Password reset email sent.");
                });
              }}
              title="Change Password"
            />
          </Menu>
        </View>
      )}
    </Appbar.Header>
  );
}
