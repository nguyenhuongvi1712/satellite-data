import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  Typography
} from "@mui/material"

const DataSetTab = ({ dataSets }) => (
  <div id="sidebar">
    <div className="sidebar__header">
      <h2>
        <TrackChangesIcon />
        Select Your Data Set(s)
      </h2>
      <Divider />

      <p>
        Check the boxes for the data set(s) you want to search. When done
        selecting data set(s), click the Additional Criteria or Results buttons
        below. Click the plus sign next to the category name to show a list of
        data sets.
      </p>
    </div>

    <Divider />
    <List>
      {dataSets &&
        dataSets.map((dataSet, index) => (
          <ListItem key={dataSet.id} disablePadding sx={{ display: "block" }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{dataSet.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {dataSet.sub ? (
                  <div>
                    {dataSet.sub.map((item) => (
                      <Accordion key={item.id}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>{item.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {item.childrenDatasets &&
                            item.childrenDatasets.map((e) => (
                              <FormControlLabel
                                key={e.id}
                                control={<Checkbox />}
                                label={e.name}
                              />
                            ))}
                        </AccordionDetails>
                      </Accordion>
                    ))}
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
);

export default DataSetTab