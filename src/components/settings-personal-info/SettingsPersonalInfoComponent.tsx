import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import styled from "./styles.module.css";
import { Box, Grid, TextField, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { tokens } from "../../theme";
import { getPublicUser, updateUserInfo } from "../../store/thunks/auth";

export const SettingsPersonalInfoComponent: FC = (): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const { user } = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      setName(user.firstName);
      setUserName(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const hendleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      firstName: name,
      username: username,
      email: email,
    };
    dispatch(updateUserInfo(data));
    dispatch(getPublicUser());
  };
  return (
    <Grid
      component="form"
      noValidate
      autoComplete="off"
      className={styled.root}
      onSubmit={hendleSubmit}
      sx={{
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: colors.blue,
          },
        },
        "& label.Mui-focused": {
          color: `${
            theme.palette.mode === "dark"
              ? colors.white.DEFAULT
              : colors.black.DEFAULT
          }`,
        },
      }}
    >
      <Box className={styled.formWrapper}>
        <TextField
          className={styled.inputField}
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          label="Ім'я"
          variant="outlined"
        />
        <TextField
          className={styled.inputField}
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          label="Юзернейм"
          variant="outlined"
        />
        <TextField
          className={styled.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          label="Емейл"
          variant="outlined"
        />
        <Box className={styled.button}>
          <LoadingButton className={styled.buttonLoading} type="submit">
            Зберегти
          </LoadingButton>
        </Box>
      </Box>
    </Grid>
  );
};

export default SettingsPersonalInfoComponent;
