import {
  Toolbar,
  AppBar,
  Box,
  Grid,
  useTheme,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { MenuOutlined } from "@mui/icons-material";
import { tokens } from "../../theme";
import styled from "./style.module.css";
import { ITopBarProps } from "../../common/types/top-bar";
import ThemeSwitcherComponent from "../theme-switcher/ThemeSwitcherComponent";
import SearchBarComponent from "../search-bar/SearchBarComponent";

export const TopBarComponent: FC<ITopBarProps> = (
  props: ITopBarProps
): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { isOpen, setIsOpen, isNonMobile } = props;

  return (
    <AppBar
      className={styled.root}
      position="static"
      sx={{
        background: `${colors.primary.DEFAULT} !important`,
        borderBottom: `1px solid ${colors.borderColor}`,
      }}
    >
      <Toolbar className={styled.toolbar}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item sm={3} lg={3}>
            <Box className={styled.flexBetween}>
              <MenuOutlined
                className={styled.menuIcon}
                onClick={() => setIsOpen(!isOpen)}
              />
              <Typography variant="h3" >
                Welcome {sessionStorage.getItem("name")}
              </Typography>
            </Box>
          </Grid>
          {isNonMobile && (
            <Grid display="flex" justifyContent="flex-end" item sm={9} lg={9}>
              <ThemeSwitcherComponent />
              <SearchBarComponent />
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default TopBarComponent;
