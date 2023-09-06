import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Divider } from "@mui/material";
import NavigateBackButton from "src/components/NavigateBackButton.tsx";

const ErrorPage = () => {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "Unknown error";
  }

  console.error(error);
  console.error(errorMessage);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>

      <Divider sx={{ margin: "1rem" }} />

      <NavigateBackButton />
    </div>
  );
};

export default ErrorPage;
