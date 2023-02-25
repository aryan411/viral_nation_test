import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/ui/card/Card";
import { Input } from "../../components/ui/input/Input";
import * as userService from "../../services/userServices/userServices";

export const AddUser: React.FunctionComponent = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
  });

  const { users } = useSelector((state: any) => state.userPage);

  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) setUser(getUserById(Number(id)));
  }, []);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const handleSaveClick = () => {
    if (
      Object.values(errors).some((error) => error) ||
      user.email == "" ||
      user.firstName == "" ||
      user.lastName == "" ||
      user.phone == ""
    ) {
      alert("All input should be field with correct input");
      return;
    }
    if (id) updateUser({ ...user, userId: Number(id) });
    else createUser({ ...user }); // Replace with your save logic

    setUser({ firstName: "", lastName: "", email: "", phone: "" }); // Clear the form
    setErrors({
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
    }); // Clear the errors
  };

  const handleCancelClick = () => {
    setUser({ firstName: "", lastName: "", email: "", phone: "" }); // Clear the form
    setErrors({
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
    }); // Clear the errors
    navigator("/users");
  };

  const handleInputError = (inputName: any) => {
    setErrors((prevState) => ({
      ...prevState,
      [inputName]: inputName !== null,
    }));
  };

  const createUser = (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => {
    userService
      .createUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      })
      .then(() => {
        navigator("/users");
      })
      .catch((err) => console.log(err));
  };

  const updateUser = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    userId: number;
  }) => {
    await userService
      .updateUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        userId: data.userId,
      })
      .catch((err) => console.log(err));
    navigator("/users");
  };

  const getUserById = (id: number) => {
    return users?.find((user: any) => user.id == id);
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
          label="First Name"
          name="firstName"
          value={user.firstName}
          onChange={handleInputChange}
          error={errors.firstName}
          helperText={errors.firstName ? "First Name is required" : ""}
          onError={handleInputError}
        />
        <Input
          label="Last Name"
          name="lastName"
          value={user.lastName}
          onChange={handleInputChange}
          error={errors.lastName}
          helperText={errors.lastName ? "Last Name is required" : ""}
          onError={handleInputError}
        />
        <Input
          label="Email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          error={errors.email}
          helperText={errors.email ? "Email is required" : ""}
          onError={handleInputError}
          type="email"
        />
        <Input
          label="Phone "
          name="phone"
          value={user.phone}
          onChange={handleInputChange}
          error={errors.phone}
          helperText={errors.phone ? "Phone is required" : ""}
          onError={handleInputError}
          type="number"
        />
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
