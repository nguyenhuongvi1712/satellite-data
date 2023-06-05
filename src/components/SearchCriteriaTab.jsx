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
const SearchCriteriaTab = () => {
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
          />
          <TextField
            id="outlined-basic"
            label="Center Longitude"
            variant="standard"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Radius"
            variant="standard"
            fullWidth
          />
          <Button variant="text">Apply</Button>
        </Stack>
      </div>
    </div>
  );
};

export default SearchCriteriaTab;
