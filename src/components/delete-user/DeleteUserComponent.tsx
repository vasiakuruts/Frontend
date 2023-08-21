import React, { FC, useState } from "react";
import { useAppDispatch } from "../../utils/hook";
import styled from "./styles.module.css";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import { deleteUser } from "../../store/thunks/auth";
import { useNavigate } from "react-router-dom";

export const DeleteUserComponent: FC = (): JSX.Element => {
  const [checked, setChecked] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDeleteUser = () => {
    dispatch(deleteUser());
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <Grid container className={styled.root}>
      <Grid className={styled.tabHeading}>
        <Typography variant="h2">Видалення акаунту</Typography>
      </Grid>
      <Grid item className={styled.alertMassage}>
        <Typography variant="body1">
          Шановний користувач, видаляючи свій обліковий запис, ви видаляєте всю
          персональну інформацію. Після видалення, вся збережена вами інформація
          буде недоступна.
        </Typography>
      </Grid>
      <Grid item className={styled.checkBoxBlock}>
        <FormGroup>
          <FormControlLabel
            sx={{ justifyContent: "center" }}
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
                sx={{
                  color: colors.blue,
                  "&.Mui-checked": { color: colors.blue },
                }}
                defaultChecked
              />
            }
            label="Я погоджуюсь"
          />
        </FormGroup>
      </Grid>
      <Grid item className={styled.buttonBlock}>
        <Button
          disabled={!checked}
          sx={{ color: `${checked === false ? "#000" : "#fff"}` }}
          className={styled.buttonApp}
          onClick={handleDeleteUser}
        >
          Видалити акаунт
        </Button>
      </Grid>
    </Grid>
  );
};

export default DeleteUserComponent;
