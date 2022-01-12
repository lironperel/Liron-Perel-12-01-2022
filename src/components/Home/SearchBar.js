import React, { useEffect, useState, useCallback } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

import { useDispatch } from "react-redux";
import { changeCity } from "../../features/displayedCity";
import { toggleError } from "../../features/appError";

import debounce from "lodash/debounce";
import asyncGetCitiesOptions from "../../api/asyncGetCitiesOptions";

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [enteredValue, setEnteredValue] = useState("");
  const [loading, setLoading] = useState(
    open && options.length === 0 && enteredValue.length > 2
  );
  const [toShort, setToShort] = useState(enteredValue.length <= 2);
  const [error, setError] = useState({ isError: false, errorText: "" });
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const getOptionsDelayed = useCallback(
    debounce((text, callback) => {
      setOptions([]);
      asyncGetCitiesOptions(text).then(setLoading(false)).then(callback);
    }, 200),
    []
  );

  useEffect(() => {
    // if not english letters only - set error on textField
    if (!/^[a-zA-Z-, ]+$/.test(enteredValue) && enteredValue.length > 0) {
      setError({
        isError: true,
        errorText: "Only english letters allowed!",
      });
    } else {
      // remove error on textField
      setError({
        isError: false,
        errorText: "",
      });
    }
    if (
      (enteredValue !== "" || enteredValue !== null) &&
      enteredValue.length > 2 &&
      !error.isError
    ) {
      setLoading(true);
      getOptionsDelayed(enteredValue, (filteredOptions) => {
        setOptions(filteredOptions);
        setLoading(false);
        setOpen(true);
      });
    } else {
      setOpen(false);
    }
  }, [enteredValue, getOptionsDelayed]);

  const handleCityChange = (event, value) => {
    if (value) {
      setEnteredValue(value.LocalizedName);
      setToShort(false);
      setOpen(false);
      dispatch(changeCity({ key: value.Key, name: value.LocalizedName }));
    }
  };

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    if (error.isError) setOpen(false);
    if (!error.isError && options.length > 0 && options !== "error")
      setOpen(true);
  }, [error]);

  useEffect(() => {
    if (options === "error") {
      dispatch(toggleError(true));
    }
  }, [options]);

  return (
    <Autocomplete
      id="search-city"
      style={{ width: "100%", marginBottom: 25 }}
      open={open}
      onOpen={() => {
        if (!error.isError && enteredValue.length > 2) setOpen(true);
      }}
      onClose={() => {
        setEnteredValue("");
        setToShort(false);
        setOpen(false);
      }}
      onChange={handleCityChange}
      onInputChange={(e, value) => {
        setEnteredValue(value);
        setToShort(value.length <= 2);
      }}
      isOptionEqualToValue={(option, value) => option.key === value.key}
      getOptionLabel={(option) =>
        `${option.LocalizedName}, ${option.Country.LocalizedName}`
      }
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.Key}>
            {`${option.LocalizedName}, ${option.Country.LocalizedName}, ${option.AdministrativeArea.LocalizedName}`}
          </li>
        );
      }}
      disableClearable
      filterOptions={(x) => x} // disable filtering on client
      forcePopupIcon={false}
      options={options !== "error" ? options : []}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Check another city by typing here..."
          variant="outlined"
          error={error.isError}
          helperText={error.errorText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={20} />}
                {toShort && enteredValue.length > 0
                  ? "Enter at least 3 characters ..."
                  : params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
