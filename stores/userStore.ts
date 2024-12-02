// stores/userStore.ts
import { create } from "zustand";

interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

interface UserStore {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  clearCurrentUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user: User) => {
    console.log("User set in Zustand:", user); // Log whenever user is set
    set({ currentUser: user });
  },
  clearCurrentUser: () => {
    console.log("User cleared from Zustand."); // Log when user is cleared
    set({ currentUser: null });
  },
}));

export default useUserStore;
