import { useState } from "react";
import { View } from "react-native";
import { Portal, Text, withTheme, MD3Theme } from "react-native-paper";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { Tabs, TabButton } from "./Tabs";
import { fireAuth } from "../firebaseConfig";
import { MModal, MModalActions, MModalHeader } from "./MModal";
import { EmailTextInput, PasswordTextInput } from "./Inputs";

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

  const errEmail = [
    "auth/invalid-email",
    "auth/missing-email",
    "auth/user-not-found",
  ].includes(error);
  const errPassword = ["auth/missing-password", "auth/wrong-password"].includes(
    error,
  );

  return (
    <View>
      <EmailTextInput
        label="Email"
        value={email}
        onChangeText={(v) => {
          setEmail(v);
          setError("");
        }}
        error={errEmail}
      />
      {errEmail ? (
        <Text style={{ color: theme.colors.error }}>Invalid Email</Text>
      ) : null}
      <PasswordTextInput
        style={{ marginTop: 5 }}
        label="Password"
        value={password}
        onChangeText={(v) => {
          setPassword(v);
          setError("");
        }}
        error={errPassword}
      />
      {errPassword ? (
        <Text style={{ color: theme.colors.error }}>Invalid Password</Text>
      ) : null}
      <Text
        style={{ marginTop: 5, color: theme.colors.primary }}
        onPress={() => setTab("Reset Password")}
      >
        Forgot Password
      </Text>

      <MModalActions
        onClose={onClose}
        onSubmit={signIn}
        submitTitle="Sign In"
      />
    </View>
  );
}

function SignupScreen({ onClose }: ScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <View>
      <EmailTextInput
        label="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <PasswordTextInput
        style={{ marginTop: 5 }}
        label="Choose a password"
        value={password}
        onChangeText={setPassword}
      />
      <PasswordTextInput
        style={{ marginTop: 5 }}
        label="Re-enter your password"
        value={password2}
        onChangeText={setPassword2}
      />

      <MModalActions
        onClose={onClose}
        onSubmit={() => alert()}
        submitTitle="Sign Up"
      />
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
      .then((_) => setTab("Sign In"))
      .catch((err) => setError(err.code));
  }

  const errEmail = [
    "auth/invalid-email",
    "auth/missing-email",
    "auth/user-not-found",
  ].includes(error);

  return (
    <View>
      <EmailTextInput
        label="Enter your email"
        value={email}
        onChangeText={(v) => {
          setEmail(v);
          setError("");
        }}
        error={errEmail}
      />
      {errEmail ? (
        <Text style={{ color: theme.colors.error }}>Invalid Email</Text>
      ) : null}

      <MModalActions
        onClose={onClose}
        onSubmit={resetPassword}
        submitTitle="Send Email"
      />
    </View>
  );
}

function AuthPopup({ visible, onClose, theme }: Props) {
  const [tab, setTab] = useState("Sign In");

  return (
    <Portal>
      <MModal visible={visible} onClose={onClose}>
        <MModalHeader title={tab} onClose={onClose} />

        <Tabs>
          <TabButton value="Sign In" tab={tab} setTab={setTab}>
            Sign In
          </TabButton>
          <TabButton value="Sign Up" tab={tab} setTab={setTab}>
            Sign Up
          </TabButton>
        </Tabs>

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
      </MModal>
    </Portal>
  );
}

export default withTheme(AuthPopup);
