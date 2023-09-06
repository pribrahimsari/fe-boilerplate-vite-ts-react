import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NavigateBackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Button
        size="small"
        variant="outlined"
        onClick={handleClick}
        color="primary"
        startIcon={<ArrowBackIcon />}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default NavigateBackButton;
