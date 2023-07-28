import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { IPropsLogin } from "../../../common/types/auth";
import styled from "../style.module.css";

const LoginPage: React.FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
  const { navigate, register, errors } = props;
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
        error={!!errors.email}
        fullWidth={true}
        margin="normal"
        label="Email"
        variant="outlined"
        placeholder="Введіть свій email"
        helperText={errors.email ? `${errors.email.message}` : ""}
        {...register("email")}
      />
      <TextField
        error={!!errors.password}
        type="password"
        fullWidth={true}
        margin="normal"
        label="Password"
        variant="outlined"
        placeholder="Введіть свій пароль"
        helperText={errors.password ? `${errors.password.message}` : ""}
        {...register("password")}
      />
      <Button
        className={styled.incitingButton}
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
        <span
          className={styled.incitingText}
          onClick={() => navigate("/register")}
        >
          Зареєструйтись
        </span>
      </Typography>
    </>
  );
};

export default LoginPage;
