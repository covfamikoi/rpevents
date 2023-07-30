import { TextInputProps } from "react-native-paper";

import MTextInput from "./MTextInput";

export default function ConfKeyTextInput(props: TextInputProps) {
  return (
    <MTextInput
      autoCapitalize="none"
      autoCorrect={false}
      autoComplete="off"
      {...props}
    />
  );
}
