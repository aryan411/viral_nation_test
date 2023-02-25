import { createSlice } from "@reduxjs/toolkit";
import User from "../../../models/interfaces/user";

const initialState: {
  listView: boolean;
  users: User[];
} = {
  listView: false,
  users: [],
};

const UserSlice: any = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeView: (state) => {
      state.listView = !state.listView;
    },
    setUsers: (state, action) => {
      return { ...state, users: action.payload };
    },
  },
});

export const { setUsers, changeView } =
  UserSlice.actions;
export default UserSlice.reducer;
