import React, { useState } from "react";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import { TabPanelComponent } from "../../components/tab-panel";
import { tabProps } from "../../utils/helpers";

export const SettingsPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Grid>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" {...tabProps(0)} />
          <Tab label="Item Two" {...tabProps(1)} />
          <Tab label="Item Three" {...tabProps(2)} />
        </Tabs>
      </Box>
      <TabPanelComponent value={value} index={0}>
        Item One
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
