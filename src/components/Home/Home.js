import Box from "@mui/material/Box";

import SearchBar from "./SearchBar";
import CurrentCityConditions from "./CurrentCityConditions";
import DaysForecast from "./DaysForecast";

function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        minHeight: "100%",
        justifyContent: "space-between",
      }}
    >
      <SearchBar />

      <Box minHeight="100%">
        <CurrentCityConditions />
        <DaysForecast />
      </Box>
    </Box>
  );
}

export default Home;
