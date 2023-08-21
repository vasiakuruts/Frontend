import React, { FC, useState } from "react";
import { useAppDispatch } from "../../utils/hook";
import styled from "./styles.module.css";
import { Box, Grid, TextField, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { tokens } from "../../theme";
import { updateUserPassword } from "../../store/thunks/auth";

export const ChangePasswordComponent: FC = (): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useAppDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const hendleChangePassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = {
      oldPassword,
      newPassword,
    };
    dispatch(updateUserPassword(data));
  };
  return (
    <Grid
      component="form"
      noValidate
      autoComplete="off"
      className={styled.root}
      onSubmit={hendleChangePassword}
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
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          type="text"
          label="Старий пароль"
          variant="outlined"
        />
        <TextField
          className={styled.inputField}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type="text"
          label="Новий пароль"
          variant="outlined"
        />
        <Box className={styled.button}>
          <LoadingButton className={styled.buttonLoading} type="submit">
            Змінити пароль
          </LoadingButton>
        </Box>
      </Box>
    </Grid>
  );
};

export default ChangePasswordComponent;
