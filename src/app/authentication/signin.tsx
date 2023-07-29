import { View } from "react-native";
import { Button } from "react-native-paper";

import { EmailTextInput, PasswordTextInput } from "../../components";

export default function Signin() {
  return (
    <View style={{ margin: 10 }}>
      <EmailTextInput label="Email" />
      <PasswordTextInput label="Password" style={{ marginTop: 5 }} />
      <Button mode="contained" style={{ marginTop: 10 }}>
        Submit
      </Button>
    </View>
  );
}
