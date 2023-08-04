import {
  Toolbar,
  AppBar,
  Box,
  Grid,
  IconButton,
  InputBase,
  useTheme,
  Typography,
} from "@mui/material";
import { FC, useContext } from "react";
import {
  LightMode,
  DarkMode,
  Search,
  NotificationsNone,
  MenuOutlined,
} from "@mui/icons-material";
import { ColorModeContext, tokens } from "../../theme";
import styled from "./style.module.css";
import { ITopBarProps } from "../../common/types/top-bar";

const TopBarComponent:FC<ITopBarProps> = (props:ITopBarProps): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode: any = useContext(ColorModeContext);
  const { isOpen, setIsOpen } = props;

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
        <Box className={styled.flexBetween}>
          <MenuOutlined
            className={styled.menuIcon}
            onClick={() => setIsOpen(!isOpen)}
          />
          <Typography variant="h3">Welcome {sessionStorage.getItem('name')}</Typography>
        </Box>
        <Box display="flex">
          <Grid
            onClick={colorMode.toggleColorMode}
            className={styled.iconBlock}
            sx={{
              borderRight: `2px solid ${colors.borderColor}`,
            }}
          >
            <IconButton className={styled.themeIcon}>
              {theme.palette.mode === "dark" ? <DarkMode /> : <LightMode />}
            </IconButton>
            <IconButton>
              <NotificationsNone />
            </IconButton>
          </Grid>
          <Grid
            className={styled.searchInputBlock}
            sx={{ backgroundColor: `${colors.primary[600]}` }}
          >
            <IconButton className={styled.searchIcon}>
              <Search />
            </IconButton>
            <InputBase className={styled.searchInput} placeholder="Пошук" />
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBarComponent;
