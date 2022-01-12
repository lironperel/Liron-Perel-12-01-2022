import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useSelector } from "react-redux";

import WeatherBox from "./shared/WeatherBox";

function Favorites() {
  const favoritesList = useSelector((state) => state.favoritesList.value.list);

  useEffect(() => {}, [favoritesList]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Typography fontWeight="bold" variant="h5" mb={4} gutterBottom>
        Your Favorite Places
      </Typography>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          maxWidth: "100%",
          flexWrap: "wrap",
        }}
      >
        {favoritesList.length > 0 ? (
          favoritesList.map((favorite, index) => (
            <WeatherBox
              key={favorite.key}
              isFavorite={true}
              favorite={favorite}
            />
          ))
        ) : (
          <Box textAlign="center">
            <Typography variant="h5" gutterBottom color="GrayText">
              No Favorites!
            </Typography>
            <Typography variant="h6" color="GrayText">
              Please add your favorite cities from home screen...
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Favorites;
