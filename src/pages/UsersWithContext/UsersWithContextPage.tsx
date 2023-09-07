import { UserContextProvider, useUserContext } from "src/pages/UsersWithContext/UserContexts.tsx";
import { Alert, Box, CircularProgress } from "@mui/material";

const UsersComponent = () => {
  const { isLoading, data: users } = useUserContext();

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );

  if (!users)
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Alert color="info">No response data</Alert>
      </Box>
    );

  return (
    <Box>
      <ul>
        {users.users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </Box>
  );
};

const UsersWithContextPage = () => {
  return (
    <UserContextProvider>
      <UsersComponent />
    </UserContextProvider>
  );
};

export default UsersWithContextPage;
