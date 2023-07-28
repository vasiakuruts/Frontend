import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { IPropsLogin } from "../../../common/types/auth";
import styled from "./style.module.css";

const LoginPage: React.FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
  const { navigate, register, errors } = props;
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
      
      <Button
        className={styled.incitingButton}
        type="submit"
        variant="contained"
      >
        Увійти
      </Button>
      
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
