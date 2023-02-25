import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./slices/notes/noteSlice";
import userSlice from "./slices/user/userSlice";

// store
export const store = configureStore({
  reducer: {
    userPage: userSlice,
    notePage: noteSlice,
  },
});
