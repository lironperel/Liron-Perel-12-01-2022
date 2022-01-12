import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";

import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";

import WeatherBox from "../shared/WeatherBox";

import { useDispatch, useSelector } from "react-redux";
import { toggleError } from "../../features/appError";

import debounce from "lodash/debounce";
import asyncGetFiveDaysForecast from "../../api/asyncGetFiveDaysForecast";

function DaysForecast() {
  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [daysForecast, setDaysForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentCity = useSelector((state) => state.currentCity.value);

  const dispatch = useDispatch();

  // eslint-disable-next-line
  const getForecastsDelayed = useCallback(
    debounce((callback) => {
      setDaysForecast([]);
      asyncGetFiveDaysForecast(currentCity.key)
        .then((forecasts) => {
          setDaysForecast(forecasts);
          setLoading(false);
        })
        .then(callback);
    }, 500),
    []
  );

  useEffect(() => {
    if (daysForecast === "error") dispatch(toggleError(true));
  }, [daysForecast]);

  useEffect(() => {
    setLoading(true);
    getForecastsDelayed();
  }, [currentCity]);

  return (
    <Box
      flexDirection={largeScreen ? "row" : "column"}
      display="flex"
      justifyContent={largeScreen ? "space-around" : "center"}
      alignItems={largeScreen ? "flex-start" : "center"}
      textAlign="center"
      marginTop={2}
      width="100%"
    >
      {daysForecast.length > 0 && !loading && daysForecast !== "error"
        ? daysForecast.map((item) => (
            <WeatherBox
              key={item.EpochDate}
              title={moment(item.Date).format("dddd")}
              subtitle={moment(item.Date).format("DD MMM, YYYY")}
              icon={item.Day.Icon}
              desc={item.Day.IconPhrase}
              degrees={item.Temperature.Minimum.Value}
              loading={loading}
            />
          ))
        : [1, 2, 3, 4, 5].map((item, index) => (
            <WeatherBox key={index} loading={loading} />
          ))}
    </Box>
  );
}

export default DaysForecast;
