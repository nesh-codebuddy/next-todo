import { UserType } from "@/types/types";

const createUserSlice = (set, ...rest) => ({
  username: "",
  email: "",
  updateUserdata: ({ username, email }: UserType) =>
    set(() => ({ username, email })),
});

export default createUserSlice;
