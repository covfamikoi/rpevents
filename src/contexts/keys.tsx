import { ReactNode, createContext, useState } from "react";

export const KeysContext = createContext<{
  keys: string[];
  addKey: (key: string) => void;
}>({
  keys: [],
  addKey: (key: string) => {
    throw "Tried to add key before context was provided.";
  },
});

export function KeysContextProvider({ children }: { children: ReactNode }) {
  const [keys, setKeys] = useState<string[]>([]);

  function addKey(key: string) {
    if (!keys.includes(key)) {
      setKeys(keys.concat(key));
    }
  }

  return (
    <KeysContext.Provider value={{ keys: keys, addKey: addKey }}>
      {children}
    </KeysContext.Provider>
  );
}
