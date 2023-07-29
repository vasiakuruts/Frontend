import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { IPropsLogin } from "../../../common/types/auth";
import styled from "./style.module.css";
import { LoadingButton } from "@mui/lab";

const LoginPage: React.FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
  const { navigate, register, errors, loading } = props;
  console.log(register);
  return (
    <>
      <Typography variant="h2" textAlign="center" fontSize={32}>
        Авторизація
      </Typography>
      <Typography variant="body1" marginBottom={3} textAlign="center">
        Введіть свою пошту та пароль
      </Typography>
      <Box className={styled.form}>
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
      </Box>

      <LoadingButton
        loading={loading}
        className={styled.incitingButton}
        type="submit"
        variant="contained"
      >
        Увійти
      </LoadingButton>

      <Box>
        <Typography variant="body1">
          Ще не зареєстровані?
          <span
            className={styled.incitingText}
            onClick={() => navigate("/register")}
          >
            Зареєструйтись
          </span>
        </Typography>
      </Box>
    </>
  );
};

export default LoginPage;
