import { create } from "zustand";

interface PasswordResetModalStore {
  isOpen: boolean;
  email: string | null;
  onOpen: (email: string) => void;
  onClose: () => void;
}

const usePasswordResetModal = create<PasswordResetModalStore>((set) => ({
  isOpen: false,
  email: null,
  onOpen: (email: string) => set({ isOpen: true, email }),
  onClose: () => set({ isOpen: false, email: null }),
}));

export default usePasswordResetModal;
