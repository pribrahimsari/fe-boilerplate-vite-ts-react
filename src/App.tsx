import AppHeader from "src/pages/layout/AppHeader.tsx";
import { Box } from "@mui/material";
import AppFooter from "src/pages/layout/AppFooter.tsx";
import { makeStyles } from "tss-react/mui";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "src/pages/ErrorPage.tsx";
import HomePage from "src/pages/HomePage.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient();

function App() {
  const { classes } = useStyles();

  return (
    <Box className={classes.appContainer}>
      <AppHeader />
      <Box className={classes.routesContainer}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Box>
      <AppFooter />
    </Box>
  );
}

export default App;
