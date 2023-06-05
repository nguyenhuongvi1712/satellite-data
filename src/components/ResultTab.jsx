import CollectionsIcon from "@mui/icons-material/Collections";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { Divider, IconButton, List, ListItem } from "@mui/material";
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
const ResultTab = ({ results }) => {
  const [{ usgsData }, dispatch] = useStateValue();
  const isChecked = (id) => {
    return usgsData.findIndex(e => e.id === id) !== -1 ? true : false
  }
  const handleOnClick = (id) => {
    const index = results.findIndex(e => e.id === id)
    if(index !== -1) {
        const usgsDataIndex = usgsData.findIndex(e => e.id === id)
        if(usgsDataIndex !== -1) {
            usgsData.splice(usgsDataIndex, 1)
        }else {
            usgsData.push(results[index])
        }
        dispatch({
          type: actionType.SET_USGS_DATA,
          usgsData
        });
        const lastItem = usgsData[usgsData.length -1]
        dispatch({
          type: actionType.SET_CENTER,
          center: [lastItem.lat, lastItem.long]
        });
    }
  }
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
                sx={{ display: "flex", alignItems: "center", padding: "15px", background: isChecked(item.id) ? 'aliceblue' : '' }}
              >
                <div>
                  <img src={item.imageUrl} />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <div>
                    <strong>Id: </strong>
                    <span>{item.idUsgs}</span>
                  </div>
                  <IconButton onClick={()=>handleOnClick(item.id)}>
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
