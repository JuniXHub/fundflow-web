import { User } from "@/generated/graphql";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
type UserState = User | null;

const initialState: UserState = null;

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});
