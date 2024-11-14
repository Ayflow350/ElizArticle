import { create } from "zustand";

interface ForgotModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useModalBlock = create<ForgotModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useModalBlock;
