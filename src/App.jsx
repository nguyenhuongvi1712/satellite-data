import "./App.css";
//MUI
import { Box, CssBaseline } from "@mui/material";
// components
import { useEffect, useState } from "react";
import { getDataSets, getResults } from "./apis";
import datasets_sample from "./common/mock/datasets_sample";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import LeafletMap from "./map/LeafletMap";
const drawerWidth = 400;
function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [dataSets, setDataSets] = useState([]);
  const [results, setResults] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await getResults();
      setResults(res);
    };
    fetch();
  }, []);
  useEffect(() => {
    const fetch = async () => {
      const res = await getDataSets();
      const landsatData = res.filter((e) => !e.parentId);
      const datasets = datasets_sample;
      const landsatIndex = datasets_sample.findIndex((e) => e.id == "cat_210");
      if (landsatIndex !== -1) datasets[landsatIndex].sub = landsatData;
      setDataSets(datasets);
    };
    fetch();
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        dataSets={dataSets}
        results={results}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <div className="h-screen relative z-0">
          <LeafletMap />
          {/* <InfoBox /> */}
          {/* <Menu /> */}
          {/* <LegendLayer /> */}
        </div>
      </Box>
    </Box>
  );
}

export default App;
