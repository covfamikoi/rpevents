import { useState } from "react";
import { View } from "react-native";
import { Button, HelperText } from "react-native-paper";

import auth from "@react-native-firebase/auth";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { ParamListBase } from "@react-navigation/native";

import {
  EmailTextInput,
  HiddenHelperText,
  PasswordTextInput,
} from "../../components";

type Props = MaterialTopTabScreenProps<ParamListBase>;

export default function Signin({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const emailErrVisible = emailErr !== "";
  const onEmailChange = (text: string) => {
    setEmailErr("");
    setEmail(text);
  };

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const passwordErrVisible = passwordErr !== "";
  const onPasswordChange = (text: string) => {
    setPasswordErr("");
    setPassword(text);
  };

  function forgotPassword() {
    setPasswordErr("");
    if (email == "") {
      return setEmailErr("Please enter your email.");
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => alert("Password reset email sent."))
      .catch((err) => {
        switch (err.code) {
          case "auth/user-not-found":
          case "auth/invalid-email":
            return setEmailErr("Incorrect email.");
          default:
            alert(`An unexpected error occured: ${err.code}`);
        }
      });
  }

  function submit() {
    let ret = false;
    if (email == "") {
      setEmailErr("Please enter your email.");
      ret = true;
    }
    if (password == "") {
      setPasswordErr("Please enter your password.");
      ret = true;
    }
    if (ret) return;

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((_user) => navigation.goBack())
      .catch((err) => {
        switch (err.code) {
          case "auth/user-not-found":
          case "auth/invalid-email":
            return setEmailErr("Incorrect email.");
          case "auth/wrong-password":
            return setPasswordErr("Incorrect password.");
          default:
            alert(`An unexpected error occurred: ${err.code}`);
        }
      });
  }

  return (
    <View style={{ margin: 10 }}>
      <EmailTextInput
        label="Email"
        error={emailErrVisible}
        onChangeText={onEmailChange}
      />
      <HiddenHelperText type="error" visible={emailErrVisible}>
        {emailErr}
      </HiddenHelperText>
      <PasswordTextInput
        label="Password"
        error={passwordErrVisible}
        onChangeText={onPasswordChange}
        style={{ marginTop: 5 }}
      />
      <HiddenHelperText type="error" visible={passwordErrVisible}>
        {passwordErr}
      </HiddenHelperText>
      <HelperText visible={true} type="info" onPress={forgotPassword}>
        Forgot password
      </HelperText>
      <Button mode="contained" style={{ marginTop: 10 }} onPress={submit}>
        Submit
      </Button>
    </View>
  );
}
