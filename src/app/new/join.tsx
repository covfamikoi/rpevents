import { useContext, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { ParamListBase } from "@react-navigation/native";

import { ConfKeyTextInput } from "../../components";
import HiddenHelperText from "../../components/HiddenHelperText";
import {
  AddConferencesContext,
  ConferencesContext,
} from "../../contexts/conferences";
import { conferenceCollection } from "../../database";

type Props = MaterialTopTabScreenProps<ParamListBase>;

export default function JoinConference({ navigation }: Props) {
  const addConferences = useContext(AddConferencesContext);
  const conferences = useContext(ConferencesContext);
  const [err, setErr] = useState("");

  const [keyInp, _setKeyInp] = useState("");
  const setKeyInp = (value: string) => {
    setErr("");
    _setKeyInp(value);
  };

  function submit() {
    const cached = conferences.get(keyInp);
    if (cached !== undefined) {
      navigation.goBack();
      navigation.navigate("ViewConference", { conference: cached });
      return;
    }

    conferenceCollection
      .doc(keyInp)
      .get()
      .then((conf) => {
        const data = conf.data();
        switch (data) {
          case undefined:
            return setErr("missing");
          default:
            const doc = { id: conf.id, data: data };
            addConferences([doc]);
            navigation.goBack();
            navigation.navigate("ViewConference", { conference: doc });
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
