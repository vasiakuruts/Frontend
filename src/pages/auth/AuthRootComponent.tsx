import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import RegisterPage from "./register/RegisterPage";
import styled from "./style.module.css";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { AppErrors } from "../../common/errors";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema, RegisterSchema } from "../../utils/yup";
import { loginUser, registerUser } from "../../store/thunks/auth";

export const AuthRootComponent: React.FC = (): JSX.Element => {
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
  const loading = useAppSelector((state) => state.auth.isLoading);

  const handleSubmitForm = async (data: any) => {

    if (location.pathname === "/login") {
      try {
        await dispatch(loginUser(data));
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

          await dispatch(registerUser(userData));
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
              loading={loading}
            />
          ) : location.pathname === "/register" ? (
            <RegisterPage
              navigate={navigate}
              register={register}
              errors={errors}
              loading={loading}
            />
          ) : null}
        </Box>
      </form>
    </div>
  );
};
export default AuthRootComponent;