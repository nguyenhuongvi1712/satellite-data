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
  IconButton,
  CircularProgress,
  Switch,
} from "@mui/material";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { computeArea } from "spherical-geometry-js";

const SatelliteData = () => {
  const [data, setData] = useState([]);
  const [{ dataGoogleEarthEngine, boundPosition, queryParams }, dispatch] =
    useStateValue();
  const [checked, setChecked] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      const res = await renderNavbar();
      setData(
        res.map((e) => {
          return {
            ...e,
            googleearthSatelliteData: e.googleearthSatelliteData.map((item) => {
              return {
                ...item,
                googleearthSatelliteDatasets:
                  item.googleearthSatelliteDatasets.map((channel) => {
                    return {
                      ...channel,
                      enableHyperResolution: false,
                    };
                  }),
              };
            }),
          };
        })
      );
      console.log("res", data);
    };
    fetch();
  }, []);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleAddToCart = async (channel) => {
    setLoading(true);
    const res = await getImageGoogleEarthEngine({
      channelId: channel.id,
      boundaryData: queryParams.mapView || null,
    });
    if (res) {
      const { north, west, south, east } = queryParams.mapView;
      const area =
        computeArea([
          { lat: north, lng: west },
          { lat: north, lng: east },
          { lat: south, lng: east },
          { lat: south, lng: west },
        ]) / 1000000;
      const cartItem = {
        data: {
          ...res,
        },
        area,
        channel,
      };
      dispatch({
        type: actionType.ADD_TO_CART,
        item: cartItem,
      });
      setLoading(false);
    }
  };
  const handleListItemClick = async (channelId, enableHyperResolution) => {
    const res = await getImageGoogleEarthEngine({
      channelId,
      boundaryData: queryParams.mapView || null,
      enableHyperResolution,
      polygon: queryParams.polygon,
    });
    if (res) {
      dispatch({
        type: actionType.SET_BOUND_POSITION,
        value: {
          mapView: res.mapViewForPolygon ? null : res.mapView || {},
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
          enableHyperResolution,
        },
      });
    }
    setChecked(channelId);
  };
  const handleOnUseHyperResolution = (
    resolutionIdx,
    satelliteIdx,
    channelIdx,
    e
  ) => {
    const newData = [...data];
    newData[resolutionIdx].googleearthSatelliteData[
      satelliteIdx
    ].googleearthSatelliteDatasets[channelIdx].enableHyperResolution =
      e.target.checked;
    setData(newData);
  };
  return (
    <>
      {data &&
        data.map((e, resolutionIdx) => (
          <div id="satellite-sidebar">
            <Divider />
            <p className="option-title">
              {e.textRender} ({e.rangePixelSize} m)
            </p>
            <List>
              {e.googleearthSatelliteData &&
                e.googleearthSatelliteData.map((satellite, satelliteIdx) => (
                  <ListItem
                    key={satellite.id}
                    disablePadding
                    sx={{ display: "block", marginBottom: "10px" }}
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
                              (channel, channelIdx) => (
                                <List
                                  component="div"
                                  disablePadding
                                  key={channel.id}
                                  sx={{ marginBottom: "5px" }}
                                >
                                  <Accordion
                                    expanded={expanded === channel.id}
                                    onChange={handleChange(channel.id)}
                                  >
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                    >
                                      <ListItemButton
                                        sx={{ pl: 4 }}
                                        selected={checked === channel.id}
                                      >
                                        <ListItemText
                                          primary={channel.nameChannel}
                                        />
                                      </ListItemButton>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <div
                                        style={{
                                          padding: "0px 16px 0px 32px",
                                        }}
                                      >
                                        <FormControlLabel
                                          control={
                                            <Switch
                                              checked={
                                                channel.enableHyperResolution
                                              }
                                              onChange={(e) =>
                                                handleOnUseHyperResolution(
                                                  resolutionIdx,
                                                  satelliteIdx,
                                                  channelIdx,
                                                  e
                                                )
                                              }
                                            />
                                          }
                                          label="Enable hyper-resolution"
                                          labelPlacement="start"
                                          sx={{
                                            margin: 0,
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: "0.75em",
                                          }}
                                        />
                                        <Divider />
                                        <div className="d-flex justify-between align-center mb-3">
                                          <div>
                                            <p>
                                              <b>Resolution: </b>
                                              {channel.resolutions}m
                                            </p>
                                            <p>
                                              <b>Wavelength: </b>
                                              {channel.wavelength}
                                            </p>
                                            <p>
                                              <b>Time start: </b>
                                              {
                                                channel
                                                  .googleEearthSatellitedata
                                                  .timeStart
                                              }
                                            </p>
                                            <p>
                                              <b>Time end: </b>
                                              {
                                                channel
                                                  .googleEearthSatellitedata
                                                  .timeEnd
                                              }
                                            </p>
                                          </div>
                                          <IconButton
                                            onClick={() =>
                                              handleListItemClick(
                                                channel.id,
                                                channel.enableHyperResolution
                                              )
                                            }
                                          >
                                            <SatelliteIcon />
                                          </IconButton>
                                        </div>
                                        {/* <Button
                                          variant="contained"
                                          fullWidth
                                          onClick={() =>
                                            handleAddToCart(channel)
                                          }
                                          disabled={
                                            queryParams.mapView === null
                                          }
                                        >
                                          {loading ? (
                                            <CircularProgress
                                              size={20}
                                              color="inherit"
                                            />
                                          ) : (
                                            "Add to cart"
                                          )}
                                        </Button> */}
                                      </div>
                                    </AccordionDetails>
                                  </Accordion>
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
