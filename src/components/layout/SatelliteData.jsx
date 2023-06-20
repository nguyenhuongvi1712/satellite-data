import { useEffect, useState } from "react";
import { getImageGoogleEarthEngine, renderNavbar } from "../../apis";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import StarBorder from "@mui/icons-material/StarBorder";
import SatelliteIcon from "@mui/icons-material/Satellite";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  ListItemButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemIcon,
} from "@mui/material";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const SatelliteData = () => {
  const [data, setData] = useState([]);
  const [{ dataGoogleEarthEngine, boundPosition, queryParams }, dispatch] =
    useStateValue();
  const [checked, setChecked] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const res = await renderNavbar();
      setData(res);
    };
    fetch();
  }, []);
  const handleListItemClick = async (channelId) => {
    
    const res = await getImageGoogleEarthEngine({
      channelId,
      boundaryData: queryParams.mapView || null,
    });
    if (res) {
      dispatch({
        type: actionType.SET_BOUND_POSITION,
        value: {
          mapView: res.mapView || {},
          position: {
            lat: res.centerLocation.latitude,
            lng: res.centerLocation.longitude,
          },
          linkSatellite: res.linkSatellite,
        },
      });

      dispatch({
        type: actionType.SET_QUERY_PARAMS,
        value: {
          ...queryParams,
          channelId,
        },
      });
    }
    setChecked(channelId);
  };
  return (
    <>
      {data &&
        data.map((e) => (
          <div id="satellite-sidebar">
            <Divider />
            <p className="option-title">{e.textRender}</p>
            <List>
              {e.googleearthSatelliteData &&
                e.googleearthSatelliteData.map((satellite, index) => (
                  <ListItem
                    key={satellite.id}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className="satellite-name">
                          {satellite.name}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {satellite.googleearthSatelliteDatasets ? (
                          <div>
                            {satellite.googleearthSatelliteDatasets.map(
                              (channel) => (
                                <List
                                  component="div"
                                  disablePadding
                                  key={channel.id}
                                >
                                  <ListItemButton
                                    sx={{ pl: 4 }}
                                    selected={checked === channel.id}
                                    onClick={() =>
                                      handleListItemClick(channel.id)
                                    }
                                  >
                                    <ListItemIcon>
                                      <SatelliteIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={channel.nameChannel}
                                    />
                                  </ListItemButton>
                                </List>
                              )
                            )}
                          </div>
                        ) : (
                          "No data"
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </ListItem>
                ))}
            </List>
          </div>
        ))}
    </>
  );
};

export default SatelliteData;
