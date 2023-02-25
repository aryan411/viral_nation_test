import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getUsers {
    users {
      id
      firstName
      lastName
      phone
      email
      createdDate
    }
  }
`;

export const GET_USER = gql`
  query getUser($userId: Float!) {
    user(id: $userId) {
      id
      firstName
      email
      createdDate
      lastName
      phone
    }
  }
`;

export const ADD_USER = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
  ) {
    createUser(
      phone: $phone
      email: $email
      lastName: $lastName
      firstName: $firstName
    ) {
      firstName
    }
  }
`;
export const UPDATE_USER = gql`
  mutation updateUser(
    $userId: Float!
    $firstName: String
    $lastName: String
    $email: String
    $phone: String
  ) {
    updateUser(
      id: $userId
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
    ) {
      id
      firstName
      lastName
      email
      phone
    }
  }
`;
export const DELETE_USER = gql`
  mutation deleteUser($userId: Float!) {
    deleteUser(id: $userId)
  }
`;
