import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, useTheme } from "react-native-paper";
import { RootStackParamList } from "..";
import { ScrollView, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = NativeStackScreenProps<RootStackParamList, "Account">;

function EmailVerification({visible}: {visible: boolean}) {
  const theme = useTheme();

  if (!visible) {
    return null;
  }

  return (
    <>
      <View style={{flexDirection: "row"}}>
        <Icon name="alert" color={theme.colors.error} style={{marginRight: 3}} />
        <Text style={{color: theme.colors.error}}>Email unverified</Text>
      </View>
      <View style={{flexDirection: "row"}}>
        <Text style={{color: theme.colors.primary}} onPress={() => alert()}>Resend verification email</Text>
        <View style={{marginHorizontal: 7}} />
        <Text style={{color: theme.colors.primary}} onPress={() => alert()}>I've verified my email</Text>
      </View>
    </>
  );
}

export default function Account({navigation}: Props) {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={{flex: 1, alignItems: "center"}}>
        {/* <Title>Signed in as {user?.email}</Title> */}
        <EmailVerification visible={true} />
      </View>
    </ScrollView>
  );
}