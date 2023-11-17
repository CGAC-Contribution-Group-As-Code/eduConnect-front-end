import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

interface UserState {
  id: string | null;
  role: number;
}

export const userSlice = createSlice({
  name: "user",
  initialState: { id: null, role: -1 } as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      console.log(action.payload.id, action.payload.role, "inredux");
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
