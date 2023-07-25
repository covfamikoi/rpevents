import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { StackHeaderProps } from "@react-navigation/stack";

export default function CustomAppBar(props: StackHeaderProps) {
  const title = getHeaderTitle(props.options, props.route.name);

  return (
    <Appbar.Header>
      {props.back ? (
        <Appbar.BackAction onPress={props.navigation.goBack} />
      ) : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}
