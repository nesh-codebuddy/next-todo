import { create } from "zustand";
import createUserSlice from "./slices/user";
import { persist } from "zustand/middleware";
import { UserStoreType } from "@/types/types";

const useStore = create<UserStoreType>()(
  persist(
    (...rest) => ({
      ...createUserSlice(...rest),
    }),
    { name: "user-store" }
  )
);

export default useStore;
