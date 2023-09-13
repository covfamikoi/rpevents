import { useContext, useEffect } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { UserContext } from "../../contexts/auth";

import { RootStackParamList } from "..";

import Account from "./account";
import Authentication from "./authentication";

export type UserModalProps = NativeStackScreenProps<RootStackParamList, "User">;

export default function UserModal({ navigation }: UserModalProps) {
  const user = useContext(UserContext);

  useEffect(() => {
    if (user !== null) {
      navigation.setOptions({ title: user.email! });
    } else {
      navigation.setOptions({ title: "Account" });
    }
  }, [user?.email]);

  return <>{user === null ? <Authentication /> : <Account user={user} />}</>;
}
