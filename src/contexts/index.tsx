import { ReactNode } from "react";

import AuthStateProvider from "./auth";
import { KeysContextProvider } from "./keys";
import ThemeProvider from "./theme";

type Props = {
  children: ReactNode;
};

export default function RootContextProvider({ children }: Props) {
  return (
    <ThemeProvider>
      <AuthStateProvider>
        <KeysContextProvider>{children}</KeysContextProvider>
      </AuthStateProvider>
    </ThemeProvider>
  );
}
