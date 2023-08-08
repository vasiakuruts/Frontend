import {
  useTheme,
  Stack,
  Autocomplete,
  TextField,
} from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import styled from "./style.module.css";
import { ISingleAsset } from "../../common/types/assets";
import { useAppSelector } from "../../utils/hook";

export const SearchBarComponent = () => {
  const assetsArray: ISingleAsset[] = useAppSelector(
    (state) => state.assets.assets
  );
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Stack spacing={2} sx={{width: 300}}>
      <Autocomplete
      freeSolo
        renderInput={(element) => (
          <TextField {...element} label="Пошук..." inputProps={{
            ...element.inputProps,
            type: "search",
          }}/>
        )}
        options={assetsArray.map((element: { name: string }) => element.name)}
      />
    </Stack>
  );
};
export default SearchBarComponent;
