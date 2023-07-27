import { ReactNode } from "react";
import { View } from "react-native";
import { Button, IconButton, Modal, Title, useTheme } from "react-native-paper";

interface MModalActionsProps {
  onClose: () => void;
  onSubmit: () => void;
  submitTitle: string;
}

export function MModalActions({onClose, onSubmit, submitTitle}: MModalActionsProps) {
  return (
    <View
      style={{
        marginVertical: 20,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Button onPress={onClose} style={{ marginRight: 10 }}>
        Cancel
      </Button>
      <Button onPress={onSubmit} mode="contained">
        {submitTitle}
      </Button>
    </View>
  )
}

interface MModalHeaderProps {
  title: string;
  onClose: () => void;
}

export function MModalHeader({ title, onClose }: MModalHeaderProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Title style={{ paddingLeft: 20 }}>{title}</Title>
      <View style={{ flex: 1 }}></View>
      <IconButton icon="close" onPress={onClose} />
    </View>
  )
}

interface MModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function MModal({ visible, onClose, children }: MModalProps) {
  const theme = useTheme();
  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      contentContainerStyle={{
        backgroundColor: theme.colors.background,
        margin: 20,
        borderRadius: 20,
        padding: 0,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      {children}
    </Modal>
  )
}
