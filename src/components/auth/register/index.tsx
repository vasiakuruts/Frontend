import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { IPropsRegister } from "../../../common/types/auth";
const RegisterPage: React.FC<IPropsRegister> = (
  props: IPropsRegister
): JSX.Element => {
  const {
    setEmail,
    setPassword,
    setRepeatPassword,
    setFirstName,
    setUsername,
    navigate,
  } = props;
  return (
    <>
      <Typography variant="h2" fontFamily="Poppins" textAlign="center">
        Реєстрація
      </Typography>
      <Typography
        variant="body1"
        marginBottom={3}
        fontFamily="Poppins"
        textAlign="center"
      >
        Введіть данні для реєстрації
      </Typography>
      <TextField
        fullWidth={true}
        margin="normal"
        label="Ім'я"
        variant="outlined"
        placeholder="Введіть ваше ім'я"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="Username"
        variant="outlined"
        placeholder="Введіть ваш username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth={true}
        margin="normal"
        type="email"
        label="Email"
        variant="outlined"
        placeholder="Введіть ваш emeil"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth={true}
        margin="normal"
        type="password"
        label="Password"
        variant="outlined"
        placeholder="Введіть ваш password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        fullWidth={true}
        margin="normal"
        type="password"
        label="Password"
        variant="outlined"
        placeholder="Повторіть ваш password"
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <Button
        type="submit"
        sx={{
          fontFamily: "Poppins",
          marginTop: 2,
          marginBottom: 2,
          width: "60%",
        }}
        variant="contained"
      >
        Реєстрація
      </Button>
      <Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
        У вас є акаунт?
        <span className="incitingText" onClick={() => navigate('/login')}>Авторизація</span>
      </Typography>
    </>
  );
};

export default RegisterPage;
