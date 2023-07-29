import { TextInputProps } from "react-native-paper";

import MTextInput from "./MTextInput";

export default function PasswordTextInput(props: TextInputProps) {
  return <MTextInput secureTextEntry={true} {...props} />;
}
