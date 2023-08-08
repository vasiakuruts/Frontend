import { FC, useEffect, useState } from "react";
import styled from "./styles.module.css";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,

} from "@mui/material";
import { ChevronLeftOutlined, LogoutOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { navMenu } from "../../common/moks/navigate";
import { tokens } from "../../theme";
import Logo from "../../assets/images/sidebar/logo.svg";
import { ISidebarProps } from "../../common/types/sidebar";
import ThemeSwitcherComponent from "../theme-switcher/ThemeSwitcherComponent";
import SearchBarComponent from "../search-bar/SearchBarComponent";

export const SidebarComponent: FC<ISidebarProps> = (
  props: ISidebarProps
): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [active, setActive] = useState("");
  const { isNonMobile, drawerWidth, isOpen, setIsOpen } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);
  const renderNavMenu = navMenu.map((element): JSX.Element => {
    return (
      <ListItem key={element.id}>
        <ListItemButton
          onClick={() => navigate(`${element.path}`)}
          className={
            active === element.path
              ? `${styled.navItem} ${styled.active}`
              : styled.navItem
          }
          sx={{
            "&:hover": {
              "& .MuiSvgIcon-root": {
                color: "#fff !important",
              },
            },
          }}
        >
          <ListItemIcon>{element.icon}</ListItemIcon>
          <ListItemText>
            <Typography variant="body1">{element.name}</Typography>
          </ListItemText>
        </ListItemButton>
      </ListItem>
    );
  });
  return (
    <Box component="nav">
      {isOpen && (
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary.main,
              backgroundColor: theme.palette.primary.main,
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Box
            className={styled.navBlock}
            sx={{
              borderBottom: `1px solid ${colors.borderColor}`,
            }}
          >
            <Box>
              <Box className={styled.flexBetween}>
                <Box className={styled.brand}>
                  <img src={Logo} alt="logo" />
                  <Typography
                    variant="h1"
                    color={
                      theme.palette.mode === "dark"
                        ? colors.white.DEFAULT
                        : colors.black.DEFAULT
                    }
                  >
                    Demo
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsOpen(!isOpen)}>
                    <ChevronLeftOutlined />
                  </IconButton>
                )}
              </Box>
            </Box>
            <List>{!isNonMobile && <SearchBarComponent />}</List>
            <List className={styled.navList}>{renderNavMenu}</List>
          </Box>
          <Box width="100%">
            <List>
              {!isNonMobile && (
                <ListItem>
                  <Box padding="5px">
                    <ThemeSwitcherComponent />
                  </Box>
                </ListItem>
              )}
              <ListItem>
                <ListItemButton
                  className={styled.navItem}
                  sx={{
                    "&:hover": {
                      "& .MuiSvgIcon-root": {
                        color: "#fff !important",
                      },
                    },
                  }}
                >
                  <ListItemIcon>
                    <LogoutOutlined />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography>Logout</Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};
export default SidebarComponent;
