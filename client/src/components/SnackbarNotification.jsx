import { useEffect, useContext } from "react";
import { Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { setOpen } from "../store/notificationSlice";
import { useDispatch, useSelector } from "react-redux";

function SnackbarNotification() {
  const { open, notification, severity } = useSelector(
    (state) => state.notification
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        dispatch(setOpen(false));
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  return open ? (
    <Alert
      variant="filled"
      severity={severity}
      sx={{
        top: 100,
        left: 75,
        right: 75,
        position: "fixed",
        zIndex: 999,
      }}
      action={
        <IconButton size="small" onClick={handleClose}>
          <CloseIcon sx={{ color: "#ffffff" }} fontSize="small" />
        </IconButton>
      }
    >
      {notification}
    </Alert>
  ) : null;
}

export default SnackbarNotification;
