import { create } from 'zustand';

type BalaceProps = {
  balance: string;
  user: string;
};

type storeProps = {
  balance: BalaceProps;
  reload: boolean;
  setBalance: (balance: BalaceProps) => void;
  setReload: (value: boolean) => void;
};

export const useStore = create<storeProps>((set) => ({
  balance: {} as BalaceProps,
  reload: false,
  setBalance: (balance: BalaceProps) => set(() => ({ balance: balance })),
  setReload: (value: boolean) => set(() => ({ reload: value })),
}));
