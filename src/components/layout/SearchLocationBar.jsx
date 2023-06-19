import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { autoSuggest } from "../../apis";
import * as React from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const SearchLocationBar = () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [{ boundPosition, zoom }, dispatch] = useStateValue();

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      if (value && value.trim().length > 0) {
        const res = await autoSuggest({ keyword: value.trim() });
        setOptions(res.items);
      }

      setLoading(false);
    };
    fetch();
  }, [value]);

  const handleOnSetBoundPosition = (value) => {
    if (value) {
      dispatch({
        type: actionType.SET_BOUND_POSITION,
        value,
      });
      dispatch({
        type: actionType.SET_CENTER,
        center: [value.position.lat, value.position.lng],
      });
    }
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 250 }}
      onChange={(event, newValue) => {
        handleOnSetBoundPosition(newValue);
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      onClose={() => setOptions([])}
      renderInput={(params) => (
        <TextField
          {...params}
          value={value}
          hiddenLabel
          size="small"
          placeholder="Add location"
          onChange={(e) => setValue(e.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.title, inputValue, { insideWords: true });
        const parts = parse(option.title, matches);

        return (
          <li {...props}>
            <div>
              <LocationOnIcon />
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
    />
  );
};
export default SearchLocationBar;
