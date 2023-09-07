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
import UsersPage from "src/pages/Users/UsersPage.tsx";
import AddUserPage from "src/pages/Users/AddUserPage.tsx";
import UsersWithContextPage from "src/pages/UsersWithContext/UsersWithContextPage.tsx";
import ProductsPage from "src/pages/Products/ProductsPage.tsx";
import { CartContextProvider } from "src/context/CartContext.tsx";

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
  {
    path: "/users",
    element: <UsersPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/users/add",
    element: <AddUserPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/users-context",
    element: <UsersWithContextPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
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
        <CartContextProvider>
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
        </CartContextProvider>
      </Box>
      <AppFooter />
    </Box>
  );
}

export default App;
