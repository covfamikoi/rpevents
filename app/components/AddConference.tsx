import { doc, getDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { HelperText, Portal, useTheme } from "react-native-paper";

import { NavigationProp } from "@react-navigation/native";

import { ConfKeyTextInput } from "./Inputs";
import { MModal, MModalActions, MModalHeader } from "./MModal";
import { TabButton, Tabs } from "./Tabs";

import { RootStackParamList } from "../App";
import { fireDb } from "../firebaseConfig";
import { useKnownPasswords } from "../global";
import { useAuthInfo } from "../hooks";
import { Conference } from "../models";

interface ScreenProps {
  onClose: () => void;
  navigation: NavigationProp<RootStackParamList, "Home", undefined>;
}

function CreateConference({ onClose }: ScreenProps) {
  return (
    <View>
      <ConfKeyTextInput label="Conference Key" />
      <MModalActions
        onClose={onClose}
        onSubmit={() => alert("todo")}
        submitTitle="Create"
      />
    </View>
  );
}

function JoinConference({ onClose, navigation }: ScreenProps) {
  const [passwords, setPasswords] = useKnownPasswords();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>(null);

  const theme = useTheme();

  async function submit() {
    if (password.length === 0) {
      setError("Please enter a conference key");
    } else if (!passwords.includes(password)) {
      getDoc(doc(fireDb, "conferences", password))
        .then((conf) => {
          const data = conf.data();
          if (data === undefined) {
            setError("Incorrect Key");
            return;
          }

          setPasswords(passwords.concat([password]));
          onClose();
          navigation.navigate("Conference", {
            conference: data as Conference,
          });
        })
        .catch((err) => setError(err.code));
    }
  }

  return (
    <View>
      <ConfKeyTextInput
        label="Conference Key"
        error={error !== null}
        onChangeText={(v) => {
          setPassword(v);
          setError(null);
        }}
        autoFocus={true}
      />
      {error === null ? null : <HelperText type="error">{error}</HelperText>}
      <MModalActions onClose={onClose} onSubmit={submit} submitTitle="Join" />
    </View>
  );
}

interface AddConferenceProps {
  visible: boolean;
  onClose: () => void;
  navigation: NavigationProp<RootStackParamList, "Home", undefined>;
}

export default function AddConference({
  visible,
  onClose,
  navigation,
}: AddConferenceProps) {
  const [_user, admin] = useAuthInfo();
  const [tab, setTab] = useState<"Join Conference" | "Create Conference">(
    "Join Conference",
  );
  const canCreate = useMemo(
    () => admin !== null && admin.createConferences,
    [admin],
  );

  useEffect(() => {
    if (!canCreate) {
      setTab("Join Conference");
    }
  }, [canCreate]);

  return (
    <Portal>
      <MModal onClose={onClose} visible={visible}>
        <MModalHeader title={tab} onClose={onClose} />
        {canCreate ? (
          <Tabs>
            <TabButton value="Join Conference" tab={tab} setTab={setTab}>
              Join Conference
            </TabButton>
            <TabButton value="Create Conference" tab={tab} setTab={setTab}>
              Create Conference
            </TabButton>
          </Tabs>
        ) : null}

        <View style={{ marginHorizontal: 20 }}>
          {(function () {
            switch (tab) {
              case "Join Conference":
                return (
                  <JoinConference onClose={onClose} navigation={navigation} />
                );
              case "Create Conference":
                return (
                  <CreateConference onClose={onClose} navigation={navigation} />
                );
            }
          })()}
        </View>
      </MModal>
    </Portal>
  );
}
