import { RootStackParamList } from "..";

import auth from "@react-native-firebase/auth";
import { useContext } from "react";
import { ScrollView, View } from "react-native";
import { Button, List, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { UserContext } from "../../contexts";

type Props = NativeStackScreenProps<RootStackParamList, "Account">;

function EmailVerification({
  visible,
  verify,
  refresh,
}: {
  visible: boolean;
  verify: () => void;
  refresh: () => void;
}) {
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
        <Text style={{ color: theme.colors.primary }} onPress={verify}>
          Resend verification email
        </Text>
        <View style={{ marginHorizontal: 7 }} />
        <Text style={{ color: theme.colors.primary }} onPress={refresh}>
          I've verified my email
        </Text>
      </View>
    </>
  );
}

export default function Account({ navigation }: Props) {
  const user = useContext(UserContext);

  function logout() {
    auth().signOut().then(() => navigation.goBack());
  }

  function verify() {
    user!.sendEmailVerification()
      .then(() => alert("Verification email sent."))
      .catch((err) => alert(`Something went wrong: ${err.code}`));
  }

  async function refresh() {
    await user?.getIdToken(true);
    await user?.reload();
  }

  function changePassword() {
    auth().sendPasswordResetEmail(user!.email!)
      .then(() => alert("Password reset email sent."))
      .catch((_err) => alert("Something went wrong."));
  }

  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{ alignItems: "center" }}>
          <EmailVerification
            visible={!user?.emailVerified}
            verify={verify}
            refresh={refresh}
          />
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
