import { useTheme, Stack, Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../theme";
import styled from "./style.module.css";
import { ISingleAsset } from "../../common/types/assets";
import { useAppSelector } from "../../utils/hook";
import { useNavigate } from "react-router-dom";

export const SearchBarComponent = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>("");
  const navigate = useNavigate();
  const assetsArray: ISingleAsset[] = useAppSelector(
    (state) => state.assets.assets
  );

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        value={selectedItem}
        onChange={(e: any, value: string | null) => {
          navigate(`/single/${value}`);
          setSelectedItem(null);
        }}
        renderInput={(element) => (
          <TextField
            {...element}
            label="Пошук..."
            inputProps={{
              ...element.inputProps,
              type: "search",
            }}
          />
        )}
        options={assetsArray.map((element: { name: string }) => element.name)}
      />
    </Stack>
  );
};
export default SearchBarComponent;
