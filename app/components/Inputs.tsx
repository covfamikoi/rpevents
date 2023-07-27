import { TextInput, TextInputProps } from "react-native-paper";

export function MTextInput(props: TextInputProps) {
  return <TextInput mode="outlined" {...props} />;
}

export function EmailTextInput(props: TextInputProps) {
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

export function PasswordTextInput(props: TextInputProps) {
  return <MTextInput secureTextEntry={true} {...props} />;
}

export function ConfKeyTextInput(props: TextInputProps) {
  return (
    <MTextInput
      autoCapitalize="none"
      autoCorrect={false}
      autoComplete="off"
      {...props}
    />
  );
}
