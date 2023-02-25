import { apolloClient } from "../../graphql/client";
import Note from "../../models/interfaces/note";
import {
  ADD_NOTE,
  DELETE_NOTE,
  GET_NOTE,
  GET_NOTES,
  UPDATE_NOTE,
} from "./queries";

// get all notes
export const getNotes = async (): Promise<Note[]> => {
  try {
    const response = await apolloClient.query({ query: GET_NOTES });
    console.log(response);
    if (!response || !response.data) throw new Error("Cannot get users list!");
    return response.data.notes;
  } catch (err) {
    throw err;
  }
};

// get note 
export const getNote = async (noteId: number): Promise<Note> => {
  try {
    const response = await apolloClient.query({
      query: GET_NOTE,
      variables: { noteId },
    });
    console.log(response);
    if (!response || !response.data) throw new Error("Cannot get user!");
    return response.data;
  } catch (err) {
    throw err;
  }
};

// create note
export const createNote = async (note: {
  text: string;
  priority: number;
  userId: number;
}): Promise<{ id: string }> => {
  try {
    const response = await apolloClient.query({
      query: ADD_NOTE,
      variables: { ...note },
    });
    console.log(response);
    if (!response || !response.data) throw new Error("Cannot get note!");
    return response.data;
  } catch (err) {
    throw err;
  }
};

//update note
export const updateNote = async (note: {
  noteId: number;
  text: string;
  priority: number;
  userId: number;
}): Promise<Note[]> => {
  try {
    const response = await apolloClient.query({
      query: UPDATE_NOTE,
      variables: { ...note },
    });
    console.log(response);
    if (!response || !response.data) throw new Error("Cannot get user!");
    return response.data;
  } catch (err) {
    throw err;
  }
};

// delete note
export const deleteNote = async (noteId: number): Promise<any> => {
  try {
    const response = await apolloClient.query({
      query: DELETE_NOTE,
      variables: { noteId },
    });
    console.log(response);
    if (!response || !response.data) throw new Error("Cannot get user!");
    return response.data;
  } catch (err) {
    throw err;
  }
};
