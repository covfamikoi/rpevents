import { ReactNode } from "react";

import AuthStateProvider from "./auth";
import ThemeProvider from "./theme";

type Props = {
  children: ReactNode;
};

export default function RootContextProvider({ children }: Props) {
  return (
    <ThemeProvider>
      <AuthStateProvider>{children}</AuthStateProvider>
    </ThemeProvider>
  );
}
