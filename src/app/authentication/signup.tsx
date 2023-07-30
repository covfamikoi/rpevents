import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "react-native-paper";

import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { ParamListBase } from "@react-navigation/native";

import {
  EmailTextInput,
  HiddenHelperText,
  PasswordTextInput,
} from "../../components";
import { fireAuth } from "../../firebaseConfig";

type Props = MaterialTopTabScreenProps<ParamListBase>;

export default function Signup({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const emailErrVisible = emailErr !== "";
  const onEmailChange = (v: string) => {
    setEmailErr("");
    setEmail(v);
  };

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const passwordErrVisible = passwordErr !== "";
  const onPasswordChange = (v: string) => {
    setPasswordErr("");
    setPassword(v);
  };

  const [password2, setPassword2] = useState("");
  const [password2Err, setPassword2Err] = useState("");
  const password2ErrVisible = password2Err !== "";
  const onPassword2Change = (v: string) => {
    setPassword2Err("");
    setPassword2(v);
  };

  function submit() {
    let ret = false;
    if (email === "") {
      setEmailErr("Please enter your email.");
      ret = true;
    }
    if (password === "") {
      setPasswordErr("Please choose a password.");
      ret = true;
    }
    if (password2 === "") {
      setPassword2Err("Please re-enter your chosen password.");
      ret = true;
    } else if (password2 !== password) {
      setPassword2Err("Passwords do no match.");
      ret = true;
    }

    if (ret) return;

    setEmailErr("");
    setPasswordErr("");
    setPassword2Err("");
    createUserWithEmailAndPassword(fireAuth, email, password)
      .then((_user) => {
        const parent = navigation.getParent()!;
        parent.goBack();
        parent.navigate("Account");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
            return setEmailErr("Invalid email.");
          case "auth/email-already-in-use":
            return setEmailErr("This email is already in use.");
          case "auth/weak-password":
            return setPasswordErr("Password is too weak.");
          default:
            alert(`An unexpected error occured: ${err.code}`);
        }
      });
  }

  return (
    <KeyboardAwareScrollView style={{ margin: 10 }} keyboardShouldPersistTaps="always">
      <EmailTextInput
        label="Enter your email"
        error={emailErrVisible}
        onChangeText={onEmailChange}
      />
      <HiddenHelperText type="error" visible={emailErrVisible}>
        {emailErr}
      </HiddenHelperText>

      <PasswordTextInput
        style={{ marginTop: 5 }}
        label="Choose a password"
        error={passwordErrVisible}
        onChangeText={onPasswordChange}
      />
      <HiddenHelperText type="error" visible={passwordErrVisible}>
        {passwordErr}
      </HiddenHelperText>

      <PasswordTextInput
        style={{ marginTop: 5 }}
        label="Re-enter your password"
        error={password2ErrVisible}
        onChangeText={onPassword2Change}
      />
      <HiddenHelperText type="error" visible={password2ErrVisible}>
        {password2Err}
      </HiddenHelperText>

      <Button mode="contained" onPress={submit} style={{ marginTop: 10 }}>
        Create Account
      </Button>
    </KeyboardAwareScrollView>
  );
}
