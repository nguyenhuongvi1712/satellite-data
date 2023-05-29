import {
  Box,
  Drawer,
  Tab,
  Tabs
} from "@mui/material"
import PropTypes from "prop-types"

import { useState } from "react"
import DataSetTab from "../DataTab"
import ResultTab from "../ResultTab"
import Logo from "./Logo"
import "./Sidebar.scss"
const drawerWidth = 400;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Sidebar = ({ mobileOpen, handleDrawerToggle, dataSets, results }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        <div className="logo">
          <Logo />
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab label="Data sets" {...a11yProps(0)} />
            <Tab label="Result" {...a11yProps(1)} />
          </Tabs>
        </div>
        <TabPanel value={currentTab} index={0}>
          <DataSetTab dataSets={dataSets} onChangeTab={()=> setCurrentTab(1)} />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <ResultTab results={results} />
        </TabPanel>
      </Drawer>
    </Box>
  );
};
export default Sidebar;
