import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    id?: string,
}

const initialState = { id: undefined } as UserState

const counterSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
    }
})