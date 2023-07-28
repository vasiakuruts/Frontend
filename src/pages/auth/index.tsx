import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginPage from "./login";
import RegisterPage from "./register";
import styled from "./style.module.css";
import { Box } from "@mui/material";
import { instance } from "../../utils/axios";
import { useAppDispatch } from "../../utils/hook";
import { login } from "../../store/slice/auth";
import { AppErrors } from "../../common/errors";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema, RegisterSchema } from "../../utils/yup";

const AuthRootComponent: React.FC = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(
      location.pathname === "/login" ? LoginSchema : RegisterSchema
    ),
  });

  const handleSubmitForm = async (data: any) => {
    console.log(data);

    if (location.pathname === "/login") {
      try {
        const userData = {
          email: data.email,
          password: data.password,
        };
        const user = await instance.post("auth/login", userData);
        await dispatch(login(user.data));
        navigate("/");
      } catch (e) {
        return e;
      }
    } else {
      if (data.password === data.confirmPassword) {
        try {
          const userData = {
            firstName: data.name,
            username: data.username,
            email: data.email,
            password: data.password,
          };
          const newUser = await instance.post("auth/register", userData);
          await dispatch(login(newUser.data));
          navigate("/");
        } catch (e) {
          console.log(e);
          return e;
        }
      } else {
        throw new Error(AppErrors.PasswordDoNotMatch);
      }
    }
  };

  return (
    <div className={styled.root}>
      <form className={styled.form} onSubmit={handleSubmit(handleSubmitForm)}>
        <Box className={styled.box}>
          {location.pathname === "/login" ? (
            <LoginPage
              navigate={navigate}
              register={register}
              errors={errors}
            />
          ) : location.pathname === "/register" ? (
            <RegisterPage
              navigate={navigate}
              register={register}
              errors={errors}
            />
          ) : null}
        </Box>
      </form>
    </div>
  );
};

export default AuthRootComponent;
