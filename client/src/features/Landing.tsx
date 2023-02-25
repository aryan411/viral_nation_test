import { Grid } from "@mui/material";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button/Button";
import { setUsers } from "../redux/slices/user/userSlice";
import { getUsers } from "../services/userServices/userServices";

export const Landing: React.FunctionComponent = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = async () => {
    const usersData = await getUsers().catch((err) => {
      console.log("error", err);
    });
    if (usersData) await dispatch(setUsers(usersData));
  };

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <Button
          onClick={() => navigator("/users")}
          label={"Users"}
          variant={"contained"}
          type={"primary"}
        />
      </Grid>
      <Grid item>
        <Button
          onClick={() => navigator("/notes")}
          label={"Notes"}
          variant={"contained"}
          type={"primary"}
        />
      </Grid>
    </Grid>
  );
};
