import { ReactNode, createContext, useContext, useState } from "react";

type ModalProps = {
  active: boolean;
  setActive: (value: boolean) => void;
};

const ModalContext = createContext<ModalProps>({} as ModalProps);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ active, setActive }}>
      {children}
    </ModalContext.Provider>
  );
}

export default function useModalContext() {
  const value = useContext(ModalContext);

  return value;
}
