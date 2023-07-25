import { Box, Grid, IconButton, InputBase, useTheme } from "@mui/material";
import { useContext } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarlModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { ColorModeContext, tokens } from "../../theme";
import styled from "./style.module.css";

const TopBarComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode: any = useContext(ColorModeContext);
  

  return (
    <Box
      className={styled.root}
      sx={{ backgroundColor: `${colors.primary.DEFAULT}`,
            borderBottom: `1px solid ${colors.borderColor}` }}
    >
      <Grid>Welcome Vasyl</Grid>
      <Box display="flex">
        <Grid
          onClick={colorMode.toggleColorMode}
          className={styled.iconBlock}
          sx={{
            borderRight: `2px solid ${colors.borderColor}`,
          }}
        >
          <IconButton className={styled.themeIcon}>
            {theme.palette.mode === "dark" ? (
              <DarlModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </IconButton>
          <IconButton>
            <NotificationsNoneIcon />
          </IconButton>
        </Grid>
        <Grid
          className={styled.searchInputBlock}
          sx={{ backgroundColor: `${colors.primary[600]}` }}
        >
          <IconButton className={styled.searchIcon}>
            <SearchIcon />
          </IconButton>
          <InputBase className={styled.searchInput} placeholder="Пошук" />
        </Grid>
      </Box>
    </Box>
  );
};

export default TopBarComponent;
