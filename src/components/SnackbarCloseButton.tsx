import { IconButton } from "@mui/material";
import { closeSnackbar, SnackbarKey } from "notistack";
import CloseIcon from "@mui/icons-material/Close";

// ref: https://github.com/iamhosseindhv/notistack/issues/156
const SnackbarCloseButton = ({ snackbarKey }: { snackbarKey: SnackbarKey }) => {
  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};

export default SnackbarCloseButton;
