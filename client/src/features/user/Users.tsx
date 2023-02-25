import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { ComboBox } from "../../components/ui/comboBox/ComboBox";
// import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
// import User from "../../models/interfaces/user";
import { changeView, setUsers } from "../../redux/slices/user/userSlice";
import { deleteUser, getUsers } from "../../services/userServices/userServices";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ToggleButton } from "../../components/ui/button/ToggleButton";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/card/Card";

enum sortTypes {
  createdDate = "createdDate",
  firsName = "firstName",
  lastName = "lastName",
}

export const Users: React.FunctionComponent = () => {
  const [sortType, setSortType] = useState<sortTypes>(sortTypes.createdDate);
  const [ascOrder, setAscOrder] = useState(true);

  const { users, listView } = useSelector((state: any) => state.userPage);

  const navigator = useNavigate();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    getAllUsers();
  }, []);


  // useEffect(() => {
  //   if (users.length) {
  //     sortChange(sortType);
  //   }
  // }, [ascOrder]);

  const changeViewUI = () => {
    dispatch(changeView());
  };

  const sortChange = async (value: sortTypes) => {
    let sortedData = [...users];
    sortedData?.sort((a: any, b: any) => {
      const sortValueA = a[value];
      const sortValueB = b[value];
      if (ascOrder) {
        return sortValueA.localeCompare(sortValueB);
      } else {
        return sortValueB.localeCompare(sortValueA);
      }
    });
    await dispatch(setUsers(sortedData));
    setSortType(value);
  };

  const handleSortOrderChange = () => {
    setAscOrder(!ascOrder);
    sortChange(sortType);
  };

  const getAllUsers = async () => {
    const usersData = await getUsers().catch((err) => {
      console.log("error", err);
    });
    if (usersData) await dispatch(setUsers(usersData));
    console.log("users", users);
  };

  const deleteUserById = async (id: number) => {
    const confirm = await deleteUser(id).catch((err) => {
      console.log("error", err);
    });

    if (confirm) {
      await getAllUsers();
    }
  };

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
                  changeViewUI();
                }}
                checked={listView}
                onLabel={"List"}
                offLabel={"Grid"}
              />
              <Button
                variant="contained"
                onClick={() => {
                  navigator(`/users/add`);
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
          {users?.map((user: any) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card styles={{ maxWidth: 234 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">First Name:</Typography>
                    <Typography variant="body1">{user.firstName}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">Last Name:</Typography>
                    <Typography variant="body1">{user.lastName}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Email:</Typography>
                    <Typography variant="body1">{user.email}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">Phone:</Typography>
                    <Typography variant="body1">{user.phone}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                      <Button
                        variant="contained"
                        onClick={() => {
                          navigator(`/users/add/${user.id}`);
                        }}
                      >
                        UPDATE
                      </Button>
                      <Button
                        variant="text"
                        onClick={() => {
                          deleteUserById(user.id);
                        }}
                      >
                        DELETE
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <List sx={{ width: "100%" }}>
          <ListItem sx={{ bgcolor: "background.paper" }}>
            <ListItemText sx={{ flexBasis: "10%" }} primary="First Name" />
            <ListItemText sx={{ flexBasis: "10%" }} primary="Last Name" />
            <ListItemText sx={{ flexBasis: "30%" }} primary="Email" />
            <ListItemText sx={{ flexBasis: "15%" }} primary="Phone" />
            <ListItemText sx={{ flexBasis: "15%" }} primary="Actions" />
          </ListItem>
          {users?.map((user: any) => (
            <ListItem
              key={user.id}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <ListItemText
                sx={{ flexBasis: "10%" }}
                primary={user.firstName}
              />
              <ListItemText sx={{ flexBasis: "10%" }} primary={user.lastName} />
              <ListItemText sx={{ flexBasis: "30%" }} primary={user.email} />
              <ListItemText sx={{ flexBasis: "15%" }} primary={user.phone} />
              <Box
                sx={{
                  flexBasis: "15%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    navigator(`/users/add/${user.id}`);
                  }}
                >
                  UPDATE
                </Button>
                <Button
                  variant="text"
                  onClick={() => {
                    deleteUserById(user.id);
                  }}
                >
                  DELETE
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};
