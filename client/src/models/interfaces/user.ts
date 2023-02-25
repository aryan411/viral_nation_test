export default interface User {
  id: string | number;
  firstName: string;
  lastName: string;
  email?: string;
  createdDate?: string;
  phone?: string;
  __typename?: string;
}
