import { useState } from "react";
import { View } from "react-native";
import {
  TextInput,
  IconButton,
  Modal,
  Portal,
  Text,
  Title,
  withTheme,
  Button,
  MD3Theme,
} from "react-native-paper";
import TabButton from "./TabButton";

interface Props {
  visible: boolean;
  onClose: () => void;
  theme: MD3Theme;
}

interface SigninProps {
  setTab: (arg0: string) => void;
  theme: MD3Theme;
  onClose: () => void;
}

interface ScreenProps {
  onClose: () => void;
}

function SigninScreen({ setTab, theme, onClose }: SigninProps) {
  return (
    <View>
      <TextInput label="Email" mode="outlined" />
      <TextInput style={{ marginTop: 5 }} label="Password" mode="outlined" />
      <Text
        style={{ marginTop: 5, color: theme.colors.primary }}
        onPress={() => setTab("Reset Password")}
      >
        Forgot Password
      </Text>

      <View
        style={{
          marginVertical: 20,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button onPress={onClose} style={{ marginRight: 10 }}>
          Cancel
        </Button>
        <Button onPress={() => alert()} mode="contained">
          Sign In
        </Button>
      </View>
    </View>
  );
}

function SignupScreen({onClose}: ScreenProps) {
  return (
    <View>
      <TextInput label="Enter your email" mode="outlined" />
      <TextInput style={{ marginTop: 5 }} label="Choose a password" mode="outlined" />
      <TextInput
        style={{ marginTop: 5 }}
        label="Re-enter password"
        mode="outlined"
      />

      <View
        style={{
          marginVertical: 20,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button onPress={onClose} style={{ marginRight: 10 }}>
          Cancel
        </Button>
        <Button onPress={() => alert()} mode="contained">
          Sign Up
        </Button>
      </View>


    </View>
  );
}

function ResetScreen({onClose}: ScreenProps) {
  return (
    <View>
      <TextInput label="Enter your email" mode="outlined" />
      <View
        style={{
          marginVertical: 20,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button onPress={onClose} style={{ marginRight: 10 }}>
          Cancel
        </Button>
        <Button onPress={() => alert()} mode="contained">
          Send Email
        </Button>
      </View>
    </View>
  )
}

function AuthPopup({ visible, onClose, theme }: Props) {
  const [tab, setTab] = useState("Sign In");

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          margin: 20,
          borderRadius: 20,
          padding: 0,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Title style={{ paddingLeft: 20 }}>{tab}</Title>
          <View style={{ flex: 1 }}></View>
          <IconButton icon="close" onPress={onClose} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <TabButton value="Sign In" tab={tab} setTab={setTab}>
            Sign In
          </TabButton>
          <TabButton value="Sign Up" tab={tab} setTab={setTab}>
            Sign Up
          </TabButton>
        </View>

        <View style={{ marginHorizontal: 20 }}>
          {(function () {
            switch (tab) {
              case "Reset Password":
                return <ResetScreen onClose={onClose} />;
              case "Sign In":
                return <SigninScreen setTab={setTab} theme={theme} onClose={onClose} />;
              case "Sign Up":
                return <SignupScreen onClose={onClose} />;
            }
          })()}
        </View>
      </Modal>
    </Portal>
  );
}

export default withTheme(AuthPopup);
