import User from "./user";

export default interface Note {
  id: number;
  text: string;
  priority: number;
  createdDate: string | number | Date;
  updatedDate: string | number | Date;
  user: {
    id: number;
  };
}
