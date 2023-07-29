import { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { ParamListBase } from "@react-navigation/native";

import { ConfKeyTextInput } from "../../components";
import HiddenHelperText from "../../components/HiddenHelperText";
import { getConference } from "../../database";
import { useKnownKeys } from "../../global";

type Props = MaterialTopTabScreenProps<ParamListBase>;

export default function JoinConference({ navigation }: Props) {
  const [keys, setKeys] = useKnownKeys();
  const [err, setErr] = useState("");

  const [keyInp, _setKeyInp] = useState("");
  const setKeyInp = (value: string) => {
    setErr("");
    _setKeyInp(value);
  };

  function submit() {
    getConference(keyInp)
      .then((conf) => {
        switch (conf) {
          case undefined:
            return setErr("missing");
          case conf:
            if (!keys.includes(keyInp)) {
              setKeys(keys.concat(keyInp));
            }
            navigation.goBack();
            navigation.navigate("ViewConference", { conference: conf });
        }
      })
      .catch((err) => setErr(err.code));
  }

  return (
    <View style={{ margin: 10 }}>
      <ConfKeyTextInput
        label="Conference Key"
        autoFocus={true}
        error={err.length !== 0}
        onChangeText={setKeyInp}
      />
      <HiddenHelperText type="error" visible={err.length !== 0}>
        Incorrect conference key
      </HiddenHelperText>
      <Button mode="contained" style={{ marginTop: 10 }} onPress={submit}>
        Submit
      </Button>
    </View>
  );
}