import { Box, Divider, Typography } from "@mui/material";
import reactLogo from "src/assets/react.svg";
import kajabiLogo from "src/assets/kajabi.svg";
import viteLogo from "src/assets/vite.svg";
import isLogo from "/logo_is.svg";
import { makeStyles } from "tss-react/mui";

// thanks to TSS-React lib for CSS in TS solution as in MUI v4
const useStyles = makeStyles()((theme) => ({
  image: {
    height: theme.spacing(5),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

const AppHeader = () => {
  const { classes } = useStyles();

  return (
    <>
      <Box display="flex" justifyContent="space-between" gap={20}>
        {/* Kajabi Logo */}
        <Box>
          <img src={kajabiLogo} className={classes.image} alt="Kajabi Logo" />
        </Box>

        {/* Title */}
        <Box>
          <Typography variant="h4">Vite + React + TS Boilerplate</Typography>
        </Box>

        {/* Other Logos */}
        <Box display="flex" gap={1}>
          <img src={viteLogo} className={classes.image} alt="Vite Logo" />
          <img src={reactLogo} className={classes.image} alt="React Logo" />
          <a href="https://isari.me" target="_blank">
            <img className={classes.image} src={isLogo} alt="İbrahim SARI logo" />
          </a>
        </Box>
      </Box>
      <Divider className={classes.divider} />
    </>
  );
};

export default AppHeader;
