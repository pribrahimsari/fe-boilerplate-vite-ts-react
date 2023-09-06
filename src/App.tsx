import { Box } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack";
import AppHeader from "src/pages/layout/AppHeader.tsx";
import AppFooter from "src/pages/layout/AppFooter.tsx";
import ErrorPage from "src/pages/ErrorPage.tsx";
import HomePage from "src/pages/HomePage.tsx";
import SnackbarCloseButton from "src/components/SnackbarCloseButton.tsx";

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
          <SnackbarProvider
            autoHideDuration={3000}
            preventDuplicate
            action={(snackbarKey) => <SnackbarCloseButton snackbarKey={snackbarKey} />}
          >
            <RouterProvider router={router} />
          </SnackbarProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Box>
      <AppFooter />
    </Box>
  );
}

export default App;
