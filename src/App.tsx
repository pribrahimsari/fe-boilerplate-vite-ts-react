import AppHeader from "src/pages/layout/AppHeader.tsx";
import { Box } from "@mui/material";
import AppFooter from "src/pages/layout/AppFooter.tsx";
import { makeStyles } from "tss-react/mui";

// import from ENV if needed
// const ANY_API_URL = import.meta.env.VITE_ANY_API_URL;
// console.debug({ ANY_API_URL });

const useStyles = makeStyles()((theme) => ({
  appContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    padding: "2rem",
  },
  routesContainer: {
    minHeight: "50vh",
    flexGrow: 1,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

function App() {
  const { classes } = useStyles();

  return (
    <Box className={classes.appContainer}>
      <AppHeader />
      <Box className={classes.routesContainer}>TODO: Routing</Box>
      <AppFooter />
    </Box>
  );
}

export default App;
