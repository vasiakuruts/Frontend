import React, { FC, useEffect, useState } from "react";
import TopBarComponent from "../top-bar/TopBarComponent";
import { Outlet, useLocation } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import SidebarComponent from "../sidebar/SidebarComponent";
import styled from "./styles.module.css";
import { useAppDispatch } from "../../utils/hook";
import { getPublicUser } from "../../store/thunks/auth";

export const LayoutComponent: FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isNonMobile = useMediaQuery("(min-width:760px)");

  useEffect(() => {
    dispatch(getPublicUser());
  }, [dispatch]);

  return location.pathname === "/login" || location.pathname === "/register" ? (
    <>
      <Outlet />
    </>
  ) : (
    <Box
      display={isNonMobile ? "flex" : "block"}
      justifyContent="space-between"
      width="100%"
      height="100%"
    >
      <SidebarComponent
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Box className={styled.mainSection}>
        <TopBarComponent
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isNonMobile={isNonMobile}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default LayoutComponent;
