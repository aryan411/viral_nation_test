import { createSlice } from "@reduxjs/toolkit";
import Note from "../../../models/interfaces/note";

const initialState: {
  listView: boolean;
  notes: Note[];
} = {
  listView: false,
  notes: [],
};

const noteSlice: any = createSlice({
  name: "note",
  initialState,
  reducers: {
    changeView: (state) => {
      state.listView = !state.listView;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
  },
});

export const { setNotes, changeView } = noteSlice.actions;
export default noteSlice.reducer;
