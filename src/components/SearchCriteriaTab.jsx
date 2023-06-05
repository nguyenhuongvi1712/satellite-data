import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from 'react';
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { getPositionByLatLon } from '../apis';


const SearchCriteriaTab = () => {
    const [{center, usgsData},dispatch] = useStateValue();

    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [radius, setRadius] = useState()

    const handleOnClick = async() => {
        const res = await getPositionByLatLon({
            lat: latitude,
            lon: longitude,
            radius
        })
        dispatch({
          type: actionType.SET_USGS_DATA,
          usgsData: [{
            tileUrl: res
          }]
        });
        dispatch({
          type: actionType.SET_CENTER,
          center: [parseFloat(latitude), parseFloat(longitude)]
        });
        
    }
  return (
    <div id="sidebar">
      <div className="sidebar__header">
        <h2>
          <TrackChangesIcon />
          Enter Search Criteria
        </h2>
      </div>
      <Divider />
      <div style={{ padding: "15px" }}>
        <Stack spacing={2}>
          <TextField
            id="outlined-basic"
            label="Center Latitude"
            variant="standard"
            fullWidth
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            type="number"
          />
          <TextField
            id="outlined-basic"
            label="Center Longitude"
            variant="standard"
            fullWidth
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Radius"
            variant="standard"
            fullWidth
            type='number'
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
          />
          <Button variant="text" onClick={handleOnClick} >Apply</Button>
        </Stack>
      </div>
    </div>
  );
};

export default SearchCriteriaTab;
