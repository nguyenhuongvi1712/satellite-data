import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../components/layout/Sidebar";
import LeafletMap from "../map/LeafletMap";
import { useEffect, useState } from "react";
import { getResults, getDataSets } from "../apis";
const drawerWidth = 400;
const MapPage = () => {
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
    <>
      <Sidebar dataSets={dataSets} results={results} />
      <CssBaseline />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          paddingTop: 9,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <div className="h-screen relative z-0">
          <LeafletMap />
        </div>
      </Box>
    </>
  );
};
export default MapPage;
