import { useRoutes } from "react-router-dom";
import { Landing } from "../features/Landing";
import { AddNote } from "../features/note/AddNote";
import { Notes } from "../features/note/Notes";
import { AddUser } from "../features/user/AddUser";
import { Users } from "../features/user/Users";


// all routes of app
export const AppRoutes = () => {
  const commonRoutes = [
    { path: "/", element: <Landing /> },
    { path: "/users", element: <Users /> },
    { path: "/users/add", element: <AddUser /> },
    { path: "/users/add/:id/", element: <AddUser /> },
    { path: "/notes", element: <Notes /> },
    { path: "/notes/add", element: <AddNote /> },
    { path: "/notes/add/:id", element: <AddNote /> },
    { path: "*", redirect: "/" },
  ];
  const element = useRoutes([...commonRoutes]);
  return <>{element}</>;
};
