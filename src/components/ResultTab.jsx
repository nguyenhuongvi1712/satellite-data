import CollectionsIcon from "@mui/icons-material/Collections";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { Divider, IconButton, List, ListItem } from "@mui/material";
const ResultTab = ({ results }) => {
  return (
    <div id="sidebar">
      <div className="sidebar__header">
        <h2>
          <TrackChangesIcon />
          Results
        </h2>
      </div>

      <Divider />
      <List>
        {results &&
          results.map((item, index) => (
            <div>
              <ListItem
                key={item.id}
                disablePadding
                sx={{ display: "flex", alignItems: "center", padding: "15px" }}
              >
                <div>
                  <img src={item.imageUrl} />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <div>
                    <strong>Id: </strong>
                    <span>{item.idUsgs}</span>
                  </div>
                  <IconButton>
                    <CollectionsIcon />
                  </IconButton>
                </div>
              </ListItem>
              <Divider />
            </div>
          ))}
      </List>
    </div>
  );
};

export default ResultTab;
