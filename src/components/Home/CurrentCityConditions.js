import React, { useState, useEffect, useCallback } from "react";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import { Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tooltip from "@mui/material/Tooltip";

import { useSelector, useDispatch } from "react-redux";
import { addToFavorites, removeFavorite } from "../../features/favoritesList";
import { toggleError } from "../../features/appError";

import debounce from "lodash/debounce";
import asyncGetCurrentConditions from "../../api/asyncGetCurrentConditions";

function CurrentCityConditions() {
  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const currentCity = useSelector((state) => state.currentCity.value);

  const [loading, setLoading] = useState(true);

  const [currentConditions, setCurrentConditions] = useState({});

  const favorites = useSelector((state) => state.favoritesList.value);

  let isFavorite = false;

  if (favorites.list && currentCity)
    isFavorite = favorites.list.some((city) => city.key === currentCity.key);

  const dispatch = useDispatch();

  const handleFavoritesClick = () => {
    isFavorite
      ? dispatch(removeFavorite(currentCity.key))
      : dispatch(addToFavorites(currentCity));
  };

  // eslint-disable-next-line
  const getCurrentConditionsDelayed = useCallback(
    debounce((callback) => {
      asyncGetCurrentConditions(currentCity.key)
        .then((conditions) => {
          setCurrentConditions(conditions);
          setLoading(false);
        })
        .then(callback);
    }, 500),
    []
  );

  useEffect(() => {
    if (currentConditions === "error") {
      dispatch(toggleError(true));
      setLoading(true);
    }
  }, [currentConditions]);

  useEffect(() => {
    getCurrentConditionsDelayed();
  }, [currentCity]);

  return (
    <>
      {loading && (
        <Grid container flexDirection="space-between" marginY={2} height="100%">
          <Grid
            container
            flexDirection="space-between"
            marginY={2}
            spacing={1}
            height="100%"
          >
            <Grid item xs={11} md={11}>
              <Skeleton
                variant="rectangular"
                width="50%"
                sx={{ marginBottom: 1 }}
              />
              <Skeleton variant="rectangular" width="50%" />
            </Grid>
            <Grid item xs={1} md={1}>
              <Skeleton variant="rectangular" />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            marginY={2}
          >
            <Grid item xs={4} md={4}>
              <Skeleton variant="rectangular" />
            </Grid>
          </Grid>
        </Grid>
      )}

      {!loading && currentConditions !== "error" && (
        <>
          <Grid container flexDirection="space-between" marginX={2}>
            <Grid item xs={11} md={11}>
              <Typography variant="h4" gutterBottom>
                {currentCity.name}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {currentConditions.Temperature.Metric.Value}°C
              </Typography>
            </Grid>
            <Grid item xs={1} md={1}>
              <Grid container justifyContent="flex-end">
                <Tooltip
                  title={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <IconButton
                    size="large"
                    aria-label="favorites"
                    sx={{ color: isFavorite ? "#ffffff" : "#FFD700" }}
                    onClick={handleFavoritesClick}
                  >
                    <StarIcon
                      fontSize="large"
                      stroke={isFavorite ? "#000000" : "#DAA520"}
                      strokeWidth={1}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={largeScreen ? "flex-start" : "center"}
            marginX={2}
            alignItems="center"
          >
            <Typography variant="h5" gutterBottom color="GrayText">
              {currentConditions.WeatherText}
            </Typography>
          </Grid>
        </>
      )}
    </>
  );
}

export default CurrentCityConditions;
