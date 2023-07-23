import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { IPropsLogin } from "../../../common/types/auth";

const LoginPage: React.FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
  const { setPassword, setEmail, navigate } = props;
  return (
    <>
      <Typography variant="h2" fontFamily="Poppins" textAlign="center">
        Авторизація
      </Typography>
      <Typography
        variant="body1"
        marginBottom={3}
        fontFamily="Poppins"
        textAlign="center"
      >
        Введіть ваш пошту та пароль
      </Typography>
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
        Увійти
      </Button>
      <Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
        Ще не зареєстровані?
        <span className="incitingText" onClick={() => navigate("/register")}>Зареєструйтись</span>
      </Typography>
    </>
  );
};

export default LoginPage;
