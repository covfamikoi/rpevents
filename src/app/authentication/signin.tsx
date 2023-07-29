import { View } from "react-native";
import { Button } from "react-native-paper";

import { EmailTextInput, HiddenHelperText, PasswordTextInput } from "../../components";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fireAuth, fireDb } from "../../firebaseConfig";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { ParamListBase } from "@react-navigation/native";

type Props = MaterialTopTabScreenProps<ParamListBase>;

export default function Signin({navigation}: Props) {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const emailErrVisible = emailErr !== "";
  const onEmailChange = (text: string) => {setEmailErr(""); setEmail(text);};

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const passwordErrVisible = passwordErr !== "";
  const onPasswordChange = (text: string) => {setPasswordErr(""); setPassword(text);};

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

    signInWithEmailAndPassword(fireAuth, email, password)
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
      <EmailTextInput label="Email" error={emailErrVisible} onChangeText={onEmailChange} />
      <HiddenHelperText type="error" visible={emailErrVisible}>{emailErr}</HiddenHelperText>
      <PasswordTextInput label="Password" error={passwordErrVisible} onChangeText={onPasswordChange} style={{ marginTop: 5 }} />
      <HiddenHelperText type="error" visible={passwordErrVisible}>{passwordErr}</HiddenHelperText>
      <Button mode="contained" style={{ marginTop: 10 }} onPress={submit}>
        Submit
      </Button>
    </View>
  );
}
