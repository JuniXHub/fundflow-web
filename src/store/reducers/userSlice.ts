import { User } from "@/generated/graphql";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserSlice = {
  user: User | null;
  isLoading: boolean;
  isAuthorized: boolean;
};

const initialState: UserSlice = {
  user: null,
  isLoading: false,
  isAuthorized: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthorized = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthorized = false;
    },
    updateUserInformation: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;

export const { loginUser, logoutUser, updateUserInformation, setLoading } =
  actions;

export default reducer;
