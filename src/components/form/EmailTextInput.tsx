import { TextInputProps } from "react-native-paper";

import MTextInput from "./MTextInput";

export default function EmailTextInput(props: TextInputProps) {
  return (
    <MTextInput
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType="email-address"
      autoComplete="email"
      {...props}
    />
  );
}
