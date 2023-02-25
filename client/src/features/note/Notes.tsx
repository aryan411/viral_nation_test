import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToggleButton } from "../../components/ui/button/ToggleButton";
import { Card } from "../../components/ui/card/Card";
import { ComboBox } from "../../components/ui/comboBox/ComboBox";
import Note from "../../models/interfaces/note";
import User from "../../models/interfaces/user";
import { changeView, setNotes } from "../../redux/slices/notes/noteSlice";
import { getNotes, deleteNote } from "../../services/noteServices/noteServices";
import { formatDate } from "../../utils/DateAndTimeFomate";

enum sortTypes {
  createdDate = "createdDate",
  text = "text",
  updatedDate = "updatedDate",
  user = "user",
}

export const Notes: React.FunctionComponent = () => {
  const [sortType, setSortType] = useState<sortTypes>(sortTypes.createdDate);
  const [ascOrder, setAscOrder] = useState(true);

  const { notes, listView } = useSelector((state: any) => state.notePage);
  const { users } = useSelector((state: any) => state.userPage);

  const dispatch = useDispatch();
  const navigator = useNavigate();

  useLayoutEffect(() => {
    getAllNotes();
  }, []);

  const handleSortOrderChange = () => {
    setAscOrder(!ascOrder);
    sortChange(sortType);
  };
  const sortChange = async (value: sortTypes) => {
    debugger;
    let sortedData = [...notes];
    if (value == sortTypes.user) {
      sortedData?.sort((a, b) => compareNotesByUserFirstName(a, b, users));
    } else {
      sortedData?.sort((a: any, b: any) => {
        const sortValueA = a[value];
        const sortValueB = b[value];
        console.log(typeof sortValueA);
        if (ascOrder) {
          return sortValueA.localeCompare(sortValueB);
        } else {
          return sortValueB.localeCompare(sortValueA);
        }
      });
    }

    await dispatch(setNotes(sortedData));
    setSortType(value);
  };
  const handleChangeViewUI = () => {
    dispatch(changeView());
  };

  const getAllNotes = async () => {
    const notesData = await getNotes().catch((err) => {
      console.log("error", err);
    });
    //
    if (notesData) dispatch(setNotes(notesData));
    console.log("notes", notes, listView);
  };
  const deleteNoteById = async (id: number) => {
    const confirm = await deleteNote(id).catch((err) => {
      console.log("error", err);
    });

    if (confirm) {
      getAllNotes();
    }
    getAllNotes();
  };

  const getUserNameById = (id: number) => {
    const user = users?.find((user: User) => user.id == id);
    return `${user.firstName} ${user.lastName}`;
  };

  const compareNotesByUserFirstName = (a: Note, b: Note, users: User[]) => {
    // Find the user associated with note a and extract their first name
    const userA = users.find((user) => user.id === a.user.id);
    const firstNameA = userA ? userA.firstName.toLowerCase() : "";

    // Find the user associated with note b and extract their first name
    const userB = users.find((user) => user.id === b.user.id);
    const firstNameB = userB ? userB.firstName.toLowerCase() : "";

    // Use the localeCompare method to compare the first names
    if (ascOrder) {
      return firstNameA.localeCompare(firstNameB);
    } else {
      return firstNameB.localeCompare(firstNameA);
    }
  };

  // useLayoutEffect(() => {
  //   if (notes.length) {
  //     sortChange(sortType);
  //   }
  // }, [ascOrder]);

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          position: "sticky",
          top: 0,
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          backgroundColor: "white",
          zIndex: 1,
        }}
      >
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item>
            <Button
              variant="contained"
              onClick={() => {
                navigator(`/`);
              }}
            >
              Back
            </Button>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            item
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ComboBox
                handleChange={(e) => sortChange(e.target.value)}
                selectedValues={sortType}
                values={Object.values(sortTypes)}
                placeholder={"sorted by"}
              />
              <ToggleButton
                onClick={() => {
                  handleSortOrderChange();
                }}
                checked={ascOrder}
                onLabel={"Asc"}
                offLabel={"Desc"}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ToggleButton
                onClick={() => {
                  handleChangeViewUI();
                }}
                checked={listView}
                onLabel={"List"}
                offLabel={"Grid"}
              />
              <Button
                variant="contained"
                onClick={() => {
                  navigator(`/notes/add`);
                }}
              >
                +
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {!listView ? (
        <Grid container spacing={2} xs={12} sx={{ mt: 3 }}>
          {notes?.map((note: any) => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <Card styles={{ maxWidth: 234 }}>
                <Grid
                  container
                  direction="column"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Grid
                    item
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    wrap="nowrap"
                  >
                    <Typography variant="h6">
                      {getUserNameById(note.user.id)}
                    </Typography>
                    <Typography variant="subtitle1">
                      Priority: {note.priority}
                    </Typography>
                  </Grid>

                  <Grid item style={{ wordBreak: "break-word" }}>
                    <div>{note.text}</div>
                  </Grid>

                  <Grid
                    item
                    container
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Created: {formatDate(note.createdDate)}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      Updated: {formatDate(note.updatedDate)}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    container
                    direction="row"
                    justifyContent="flex-end"
                    spacing={1}
                  >
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={() => {
                          navigator(`/notes/add/${note.id}`);
                        }}
                      >
                        UPDATE
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="text"
                        onClick={() => {
                          deleteNoteById(note.id);
                        }}
                      >
                        DELETE
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container direction="column" spacing={1}>
          {notes?.map((note: any) => (
            <Grid item key={note.id}>
              <Card>
                <Grid
                  container
                  direction="column"
                  alignItems="flex-start"
                  spacing={1}
                >
                  <Grid
                    item
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    wrap="nowrap"
                  >
                    <Typography variant="h6">
                      {getUserNameById(note.user.id)}
                    </Typography>
                    <Typography variant="subtitle1">
                      Priority: {note.priority}
                    </Typography>
                  </Grid>

                  <Grid item style={{ wordBreak: "break-word" }}>
                    <div>{note.text}</div>
                  </Grid>

                  <Grid
                    item
                    container
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Grid item>
                      <Typography variant="subtitle2" color="text.secondary">
                        Created: {formatDate(note.createdDate)}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        Updated: {formatDate(note.updatedDate)}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={() => {
                          navigator(`/notes/add/${note.id}`);
                        }}
                      >
                        UPDATE
                      </Button>

                      <Button
                        variant="text"
                        onClick={() => {
                          deleteNoteById(note.id);
                        }}
                      >
                        DELETE
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
