import { ReactNode } from "react";

import AuthStateProvider from "./auth";
import ConferenceStreamProvider from "./conferenceStream";
import ConferencesProvider from "./conferences";
import ThemeProvider from "./theme";

type Props = {
  children: ReactNode;
};

export default function RootContextProvider({ children }: Props) {
  return (
    <ThemeProvider>
      <AuthStateProvider>
        <ConferencesProvider>
          <ConferenceStreamProvider>{children}</ConferenceStreamProvider>
        </ConferencesProvider>
      </AuthStateProvider>
    </ThemeProvider>
  );
}
