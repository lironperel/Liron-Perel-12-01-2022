import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { toggleError } from "../features/appError";

export default function ErrorDialog() {
  const appError = useSelector((state) => state.appError.value);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(appError);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleRefresh = () => {
    setOpen(false);
    dispatch(toggleError(false));
    window.location.reload(true);
  };

  useEffect(() => {
    setOpen(appError);
  }, [appError]);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleRefresh}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Server error"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Application aborted due to server error, our API is limited to 50
            requests per day, this might be the reason
          </DialogContentText>
          <DialogContentText>
            Do you want to refresh and try again?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRefresh} autoFocus>
            Refresh
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
