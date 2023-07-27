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
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import TabButton from "./TabButton";
import { fireAuth } from "../firebaseConfig";

interface Props {
  visible: boolean;
  onClose: () => void;
  theme: MD3Theme;
}

interface ScreenProps {
  setTab: (arg0: string) => void;
  theme: MD3Theme;
  onClose: () => void;
}

function SigninScreen({ setTab, theme, onClose }: ScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function signIn() {
    if (email.length === 0) {
      return setError("auth/missing-email");
    }
    if (password.length === 0) {
      return setError("auth/missing-password");
    }

    signInWithEmailAndPassword(fireAuth, email, password)
      .then((_) => onClose())
      .catch((err) => setError(err.code));
  }

  return (
    <View>
      <TextInput
        mode="outlined"
        label="Email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        onChangeText={(v) => {
          setEmail(v);
          setError("");
        }}
      />
      {[
        "auth/invalid-email",
        "auth/missing-email",
        "auth/user-not-found",
      ].includes(error) ? (
        <Text style={{ color: theme.colors.error }}>Invalid Email</Text>
      ) : null}
      <TextInput
        style={{ marginTop: 5 }}
        mode="outlined"
        label="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(v) => {
          setPassword(v);
          setError("");
        }}
      />
      {["auth/missing-password", "auth/wrong-password"].includes(error) ? (
        <Text style={{ color: theme.colors.error }}>Invalid Password</Text>
      ) : null}
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
        <Button onPress={signIn} mode="contained">
          Sign In
        </Button>
      </View>
    </View>
  );
}

function SignupScreen({ onClose }: ScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <View>
      <TextInput
        mode="outlined"
        label="Enter your email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{ marginTop: 5 }}
        mode="outlined"
        label="Choose a password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={{ marginTop: 5 }}
        mode="outlined"
        label="Re-enter your password"
        secureTextEntry={true}
        value={password2}
        onChangeText={setPassword2}
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

function ResetScreen({ onClose, theme, setTab }: ScreenProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function resetPassword() {
    if (email.length === 0) {
      return setError("auth/missing-email");
    }

    sendPasswordResetEmail(fireAuth, email)
      .then((ret) => setTab("Sign In"))
      .catch((err) => setError(err.code));
  }

  return (
    <View>
      <TextInput
        mode="outlined"
        label="Enter your email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        onChangeText={(v) => {
          setEmail(v);
          setError("");
        }}
      />
      {[
        "auth/invalid-email",
        "auth/missing-email",
        "auth/user-not-found",
      ].includes(error) ? (
        <Text style={{ color: theme.colors.error }}>Invalid Email</Text>
      ) : null}
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
        <Button onPress={resetPassword} mode="contained">
          Send Email
        </Button>
      </View>
    </View>
  );
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
                return (
                  <ResetScreen
                    onClose={onClose}
                    theme={theme}
                    setTab={setTab}
                  />
                );
              case "Sign In":
                return (
                  <SigninScreen
                    setTab={setTab}
                    theme={theme}
                    onClose={onClose}
                  />
                );
              case "Sign Up":
                return (
                  <SignupScreen
                    onClose={onClose}
                    theme={theme}
                    setTab={setTab}
                  />
                );
            }
          })()}
        </View>
      </Modal>
    </Portal>
  );
}

export default withTheme(AuthPopup);
