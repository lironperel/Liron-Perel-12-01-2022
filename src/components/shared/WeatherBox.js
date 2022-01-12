// This component is shared between home page forecast boxes and favorites page boxes

import React, { useState, useEffect, useCallback } from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Skeleton from "@mui/material/Skeleton";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeCity } from "../../features/displayedCity";
import { removeFavorite } from "../../features/favoritesList";

import debounce from "lodash/debounce";
import asyncGetCurrentConditions from "../../api/asyncGetCurrentConditions";

const LoadingPaper = () => {
  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  return (
    <Paper
      variant="outlined"
      sx={{
        minHeight: "200px",
        width: largeScreen ? "20%" : "50%",
        marginBottom: 2,
        padding: 1,
        marginX: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Skeleton variant="text" width="100%" height="20%" />
      <Skeleton variant="text" width="100%" height="20%" />
      <Skeleton variant="circular" width="30%" height="30%" />
      <Skeleton variant="text" width="100%" height="30%" />
    </Paper>
  );
};

const WeatherIcon = (props) => {
  return (
    <img
      height="50px"
      alt="weather-icon"
      src={`https://developer.accuweather.com/sites/default/files/${
        props.iconNumber < 10 ? "0" : ""
      }${props.iconNumber}-s.png`}
    />
  );
};

function WeatherBox(props) {
  const isFavorite = props.isFavorite;
  const favorite = props.favorite;

  let title = props.title;
  let subtitle = props.subtitle;
  let icon = props.icon;
  let desc = props.desc;
  let degrees = props.degrees;
  let loading = isFavorite ? true : props.loading;

  const [weatherData, setWeatherData] = useState({
    title,
    subtitle,
    icon,
    desc,
    degrees,
    loading,
  });

  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const dispatch = useDispatch();
  let navigate = useNavigate();

  // eslint-disable-next-line
  const getForecastsDelayed = useCallback(
    debounce((key, callback) => {
      asyncGetCurrentConditions(key)
        .then((value) => {
          setWeatherData({
            title: favorite.name,
            icon: value.WeatherIcon,
            desc: value.WeatherText,
            degrees: value.Temperature.Metric.Value,
            loading: false,
          });
        })
        .then(callback);
    }, 500),
    []
  );

  useEffect(() => {
    if (isFavorite) {
      const favData = async () => await getForecastsDelayed(favorite.key);
      favData();
    }
  }, []);

  if (weatherData.loading) return <LoadingPaper />;
  // else - if not loading
  return (
    <Paper
      variant="outlined"
      sx={{
        minHeight: "200px",
        width: largeScreen ? "20%" : "50%",
        marginBottom: 2,
        marginX: 1,
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        textAlign: "center",
      }}
    >
      <ButtonBase
        width="100%"
        height="100%"
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          color: "text.primary",
        }}
        onClick={() => {
          if (isFavorite) {
            dispatch(changeCity({ key: favorite.key, name: favorite.name }));
            navigate("/");
          }
        }}
        disabled={!isFavorite}
      >
        <Typography fontWeight="bold" variant="h5">
          {weatherData.title}
        </Typography>
        <Typography variant="h6" gutterBottom noWrap>
          {weatherData.subtitle}
        </Typography>

        <WeatherIcon iconNumber={weatherData.icon} />

        <Typography
          variant="h6"
          gutterBottom
          textAlign="center"
          fontSize="1em"
          noWrap
        >
          {weatherData.desc}
        </Typography>
        <Typography variant="h6" gutterBottom textAlign="center" noWrap>
          {weatherData.degrees}°C
        </Typography>
      </ButtonBase>
      {isFavorite && (
        <Button
          onClick={() => dispatch(removeFavorite(favorite.key))}
          variant="outlined"
        >
          Remove
        </Button>
      )}
    </Paper>
  );
}

export default WeatherBox;
