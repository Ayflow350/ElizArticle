import { create } from "zustand";

interface VerifyModalStore {
  isOpen: boolean;
  email: string | null;
  onOpen: (email: string) => void;
  onClose: () => void;
}

const useVerifyModal = create<VerifyModalStore>((set) => ({
  isOpen: false,
  email: null,
  onOpen: (email: string) => set({ isOpen: true, email }),
  onClose: () => set({ isOpen: false, email: null }),
}));

export default useVerifyModal;
