import { Box, Button, Grid } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/ui/card/Card";
import { ComboBox } from "../../components/ui/comboBox/ComboBox";
import { Input } from "../../components/ui/input/Input";
import User from "../../models/interfaces/user";
import * as noteService from "../../services/noteServices/noteServices";

export const AddNote: React.FunctionComponent = () => {
  const [note, setNote] = useState({
    userId: 0,
    text: "",
    priority: 0,
  });
  const [selectedUser, setSelectedUser] = useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    createdDate: "",
    __typename: "User",
  });
  const [errors, setErrors] = useState({
    userId: false,
    text: false,
    priority: false,
  });
  const { users } = useSelector((state: any) => state.userPage);
  const { notes } = useSelector((state: any) => state.notePage);

  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (selectedUser)
      setNote((prev) => {
        return { ...prev, userId: Number(selectedUser.id) };
      });
  }, [selectedUser]);
  useLayoutEffect(() => {
    console.log("user", users);
    if (id) {
      const note = getNoteById(Number(id));
      const user = users.find((user: any) => user.id == note.user.id);
      setSelectedUser(user);
      setNote({ ...note, userId: note.user.id });
    }
  }, []);

  const handleSaveClick = () => {
    if (
      Object.values(errors).some((error) => error) ||
      !note.userId ||
      !note.text
    ) {
      alert("Cannot save - there are errors");
      return;
    }
    if (id) updateNote({ ...note, noteId: Number(id) });
    else createNote({ ...note }); // Replace with your save logic
    setNote({
      userId: 0,
      text: "",
      priority: 0,
    }); // Clear the form
    setErrors({
      userId: false,
      text: false,
      priority: false,
    }); // Clear the errors
  };
  const handleCancelClick = () => {
    setNote({
      userId: 0,
      text: "",
      priority: 0,
    }); // Clear the form
    setErrors({
      userId: false,
      text: false,
      priority: false,
    }); // Clear the errors
    navigator("/notes");
  };
  const handleInputError = (inputName: any) => {
    setErrors((prevState) => ({
      ...prevState,
      [inputName]: inputName !== null,
    }));
  };
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setNote((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const createNote = async (data: {
    text: string;
    priority: number;
    userId: number;
  }) => {
    await noteService
      .createNote({
        text: data.text,
        priority: data.priority,
        userId: data.userId,
      })
      .then(() => navigator("/notes"))
      .catch((err) => console.log(err));
  };
  const updateNote = async (data: {
    text: string;
    priority: number;
    userId: number;
    noteId: number;
  }) => {
    await noteService
      .updateNote({
        text: data.text,
        priority: data.priority,
        userId: data.userId,
        noteId: data.noteId,
      })
      .then(() => navigator("/notes"))
      .catch((err) => console.log(err));
  };
  const getNoteById = (id: number) => {
    return notes?.find((note: any) => note.id == id);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card>
        <Input
          label="Text"
          name="text"
          value={note.text}
          onChange={handleInputChange}
          error={errors.text}
          helperText={errors.text ? "Text is required" : ""}
          onError={handleInputError}
          multiline
        />
        <Input
          label="Priority"
          name="priority"
          value={note.priority.toString()}
          onChange={(event) => {
            setNote({ ...note, priority: Number(event.target.value) });
            setErrors({
              ...errors,
              priority: false,
            });
          }}
          error={errors.priority}
          helperText={errors.priority ? "Priority is required" : ""}
          onError={handleInputError}
          type={"number"}
        />
        {users.length && selectedUser && (
          <ComboBox
            disabled={Boolean(id)}
            name="userId"
            handleChange={(e) => {
              setSelectedUser(e.target.value);
            }}
            selectedValues={selectedUser}
            values={users}
            placeholder={"users"}
            error={errors.userId}
            onError={handleInputError}
          />
        )}
        <br />
        <br />
        <Grid container spacing={3}>
          <Grid item>
            <Button variant="contained" onClick={handleSaveClick}>
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleCancelClick}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};
