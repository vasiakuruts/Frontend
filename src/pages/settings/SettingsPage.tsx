import React, { useEffect, useState } from "react";
import { Box, Grid, Tab, Tabs, useTheme } from "@mui/material";
import { TabPanelComponent } from "../../components/tab-panel";
import { tabProps } from "../../utils/helpers";
import styled from "./styles.module.css";
import { tokens } from "../../theme";
import { SettingsPersonalInfoComponent } from "../../components/settings-personal-info";
import { useAppDispatch } from "../../utils/hook";
import { getPublicUser } from "../../store/thunks/auth";

export const SettingsPage = () => {
  const [value, setValue] = useState(0);
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    dispatch(getPublicUser());
  }, [dispatch]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Grid className={styled.root}>
      <Box
        className={styled.tabsWapper}
        sx={{ borderBottom: `1px solid ${colors.borderColor}` }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Settings tabs"
          centered
          textColor="secondary"
          TabIndicatorProps={{ style: { backgroundColor: colors.blue } }}
        >
          <Tab label="Персональні данні" {...tabProps(0)} />
          <Tab label="Змінити пароль" {...tabProps(1)} />
          <Tab label="Видалити акаунт" {...tabProps(2)} />
        </Tabs>
      </Box>
      <TabPanelComponent value={value} index={0}>
        <SettingsPersonalInfoComponent />
      </TabPanelComponent>
      <TabPanelComponent value={value} index={1}>
        Item Two
      </TabPanelComponent>
      <TabPanelComponent value={value} index={2}>
        Item Three
      </TabPanelComponent>
    </Grid>
  );
};
export default SettingsPage;
