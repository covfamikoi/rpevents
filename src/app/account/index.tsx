import { RootStackParamList } from "..";

import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Button, List, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { fireAuth } from "../../firebaseConfig";
import { useAdmin, useUser } from "../../hooks";

type Props = NativeStackScreenProps<RootStackParamList, "Account">;

function EmailVerification({ visible }: { visible: boolean }) {
  const theme = useTheme();

  if (!visible) {
    return null;
  }

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <Icon
          name="alert"
          color={theme.colors.error}
          style={{ marginRight: 3 }}
        />
        <Text style={{ color: theme.colors.error }}>Email unverified</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: theme.colors.primary }} onPress={() => alert()}>
          Resend verification email
        </Text>
        <View style={{ marginHorizontal: 7 }} />
        <Text style={{ color: theme.colors.primary }} onPress={() => alert()}>
          I've verified my email
        </Text>
      </View>
    </>
  );
}

export default function Account({ navigation }: Props) {
  const user = useUser();

  useEffect(() => {
    if (user === null && navigation.isFocused()) {
      navigation.replace("Authentication");
    }
  }, [user]);

  function logout() {
    signOut(fireAuth).then(() => navigation.goBack());
  }

  function changePassword() {
    sendPasswordResetEmail(fireAuth, user!.email!)
      .then(() => alert("Password reset email sent."))
      .catch((_err) => alert("Something went wrong."));
  }

  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{ alignItems: "center" }}>
          <EmailVerification visible={true} />
        </View>

        <List.Section>
          <List.Subheader>Account</List.Subheader>
          <Button mode="contained-tonal" onPress={logout}>
            Logout
          </Button>
          <View style={{ marginVertical: 5 }} />
          <Button mode="contained-tonal" onPress={changePassword}>
            Change Password
          </Button>
        </List.Section>
      </ScrollView>
    </View>
  );
}