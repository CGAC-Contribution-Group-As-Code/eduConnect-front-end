import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  role: number;
}

export const userSlice = createSlice({
  name: "user",
  initialState: { id: null, role: 0 } as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.role = action.payload.role;
    },
    logoutUser: (state) => {
      state.id = null;
      state.role = 0;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
