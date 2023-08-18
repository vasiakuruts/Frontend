import React, { useState } from "react";
import { useAppSelector } from "../../utils/hook";
import styled from "./styles.module.css";
import { Box, Grid, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const SettingsPersonalInfoComponent = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    email: "",
  });
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Grid
      component="form"
      noValidate
      autoComplete="off"
      className={styled.root}
    >
      <Box className={styled.formWrapper}>
        <TextField
          className={styled.inputField}
          type="text"
          label="Ім'я"
          variant="outlined"
        />
        <TextField
          className={styled.inputField}
          type="text"
          label="Юзернейм"
          variant="outlined"
        />
        <TextField
          className={styled.inputField}
          type="text"
          label="Емейл"
          variant="outlined"
        />
        <Box className={styled.button}>
          <LoadingButton>Зберегти</LoadingButton>
        </Box>
      </Box>
    </Grid>
  );
};

export default SettingsPersonalInfoComponent;
