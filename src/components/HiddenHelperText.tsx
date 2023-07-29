import { HelperText, HelperTextProps } from "react-native-paper";

export default function HiddenHelperText({
  visible,
  ...rest
}: HelperTextProps) {
  return visible ? <HelperText visible={true} {...rest}></HelperText> : null;
}
