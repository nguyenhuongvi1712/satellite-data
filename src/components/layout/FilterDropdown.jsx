import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Button,
  Menu,
  Divider,
  Slider,
  FormControlLabel,
  Box,
  Checkbox,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// mock data
import datasets_sample from "../../common/mock/datasets_sample";
const drawerWidth = 400;
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    padding: 10,
    maxWidth: drawerWidth,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const FilterDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Filters
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <p
          style={{ fontSize: "1.3em", marginBottom: 10 }}
          className="text-bold"
        >
          Filters
        </p>
        <Divider sx={{ my: 0.5 }} />
        <div className="filter-content">
          <div className="mb-1">
            <label className="text-bold">Acquisition date</label>
            <div className="d-flex justify-between">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker slotProps={{ textField: { size: "small" } }} />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker slotProps={{ textField: { size: "small" } }} />
              </LocalizationProvider>
            </div>
          </div>
          <div className="mb-1">
            <label className="text-bold">Maximum cloud coverage</label>
            <div>
              <Slider
                aria-label="Temperature"
                defaultValue={30}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={110}
              />
            </div>
          </div>
          <div className="mb-1">
            <label className="text-bold">Collections</label>
            <div>
              {datasets_sample &&
                datasets_sample.map((e) => (
                  <div key={e.id}>
                    <FormControlLabel label={e.name} control={<Checkbox />} />
                    {e.childrenDatasets &&
                      e.childrenDatasets.map((sub) => (
                        <Box
                          key={sub.id}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            ml: 3,
                          }}
                        >
                          <FormControlLabel
                            label={sub.name}
                            control={<Checkbox />}
                          />
                        </Box>
                      ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <Divider sx={{ my: 0.5 }} />
        <div className="d-flex justify-between">
          <Button variant="contained" onClick={handleClose}>
            Apply filters
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Reset to default
          </Button>
        </div>
      </StyledMenu>
    </div>
  );
};
export default FilterDropdown;
