import { useState } from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import MoreIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import useMediaQuery from "@mui/material/useMediaQuery";

import WeatherIcon from "../assets/weatherIcon.png";

import { useDispatch, useSelector } from "react-redux";
import { toggleColor } from "../features/theme";

export default function Header() {
  const dispatch = useDispatch();
  const themeColor = useSelector((state) => state.theme.value);
  const favoritesCount = useSelector(
    (state) => state.favoritesList.value.count
  );

  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={Link} to="/">
        <IconButton size="large" aria-label="home" color="inherit">
          <HomeIcon />
        </IconButton>
        <Typography variant="subtitle1">Home</Typography>
      </MenuItem>
      <MenuItem component={Link} to="/favorites">
        <IconButton size="large" aria-label="favorites" color="inherit">
          <Badge badgeContent={favoritesCount} color="secondary">
            <StarIcon />
          </Badge>
        </IconButton>
        <Typography variant="subtitle1">Favorites</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(toggleColor());
        }}
      >
        <IconButton sx={{ ml: 1 }} color="inherit">
          {themeColor === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <p>{themeColor === "dark" ? "Light" : "Dark"} mode</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Home logo"
            sx={{ mr: 2 }}
            component={Link}
            to="/"
          >
            <Avatar
              alt="Home"
              src={WeatherIcon}
              sx={{ width: 40, height: 40 }}
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { sm: "block" } }}
          >
            Herolo Weather
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              component={Link}
              to="/"
              size="large"
              aria-label="home"
              color="inherit"
            >
              <HomeIcon />
            </IconButton>
            <IconButton
              component={Link}
              to="/favorites"
              size="large"
              aria-label="favorites"
              color="inherit"
            >
              <Badge badgeContent={favoritesCount} color="secondary">
                <StarIcon />
              </Badge>
            </IconButton>
            <IconButton
              onClick={() => {
                dispatch(toggleColor());
              }}
              sx={{ ml: 1 }}
              color="inherit"
            >
              {themeColor === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {!largeScreen && renderMobileMenu}
    </Box>
  );
}
