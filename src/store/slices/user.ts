import { UserType } from "@/types/types";

// Zustand User Slice
const createUserSlice = (set, ...rest) => ({
  username: "",
  email: "",
  updateUserdata: ({ username, email }: UserType) =>
    set(() => ({ username, email })),
});

export default createUserSlice;
