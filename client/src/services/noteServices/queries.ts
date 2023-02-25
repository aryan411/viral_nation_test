import gql from "graphql-tag";

export const GET_NOTES = gql`
  query getNotes {
    notes {
      id
      priority
      text
      updatedDate
      createdDate
      user {
        id
      }
    }
  }
`;
export const GET_NOTE = gql`
  query getNote($noteId: Float!) {
    note(id: $noteId) {
      id
      createdDate
      priority
      text
      updatedDate
      user {
        id
      }
    }
  }
`;
export const ADD_NOTE = gql`
  mutation createNote($userId: Float!, $priority: Float!, $text: String!) {
    createNote(userId: $userId, priority: $priority, text: $text) {
      text
    }
  }
`;
export const UPDATE_NOTE = gql`
  mutation updateNote($noteId: Float!, $text: String, $priority: Float) {
    updateNote(id: $noteId, text: $text, priority: $priority) {
      id
      text
      priority
    }
  }
`;
export const DELETE_NOTE = gql`
  mutation deleteNote($noteId: Float!) {
    deleteNote(id: $noteId)
  }
`;
