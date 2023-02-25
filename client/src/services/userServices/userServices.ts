import { apolloClient } from "../../graphql/client";
import User from "../../models/interfaces/user";
import {
  ADD_USER,
  DELETE_USER,
  GET_USER,
  GET_USERS,
  UPDATE_USER,
} from "./queries";



// get All users
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await apolloClient.query({ query: GET_USERS });
    console.log(response);
    if (!response || !response.data) throw new Error("Cannot get users list!");
    return response.data.users;
  } catch (err) {
    throw err;
  }
};

// get user by id
// not using too much as i'm storing data in stated this is for just understanding
export const getUser = async (userId: number): Promise<User> => {
  try {
    const response = await apolloClient.query({
      query: GET_USER,
      variables: { userId },
    });
    console.log(response);
    if (!response || !response.data) throw new Error("Cannot get user!");
    return response.data;
  } catch (err) {
    throw err;
  }
};

// create users all params are require
export const createUser = async (user: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}): Promise<{ id: string }> => {
  try {
     
    const response = await apolloClient.mutate({
      mutation: ADD_USER,
      variables: { ...user },
    });
    console.log(response);
    if (!response || !response.data) throw new Error("Cannot get user!");
    return response.data;
  } catch (err) {
    throw err;
  }
};

// update user,  UserId is required
export const updateUser = async (user: {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}): Promise<any> => {
  try {
    const response = await apolloClient.mutate({
      mutation: UPDATE_USER,
      variables: { ...user },
    });
    console.log(response);
    if (!response || !response.data) throw new Error("Cannot get user!");
    return response.data;
  } catch (err) {
    throw err;
  }
};

// delete user by Id
export const deleteUser = async (userId: number): Promise<any> => {
  try {
    const response = await apolloClient.mutate({
      mutation: DELETE_USER,
      variables: { userId },
    });
    console.log(response);
    if (!response || !response.data) throw new Error("Cannot get user!");
    return response.data;
  } catch (err) {
    throw err;
  }
};
