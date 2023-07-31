import { ReactNode } from "react";

import AuthStateProvider from "./auth";
import ConferencesProvider from "./conferences";
import ThemeProvider from "./theme";

type Props = {
  children: ReactNode;
};

export default function RootContextProvider({ children }: Props) {
  return (
    <ThemeProvider>
      <AuthStateProvider>
        <ConferencesProvider>{children}</ConferencesProvider>
      </AuthStateProvider>
    </ThemeProvider>
  );
}
