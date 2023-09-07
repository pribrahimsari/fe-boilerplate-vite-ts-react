import { useSnackbar } from "notistack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addUser, getUsers } from "src/api/apiService.ts";

const UsersPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { refetch, isLoading, isFetching, data } = useQuery(["users"], () => getUsers({}), {
    refetchOnWindowFocus: false,
    onError: (err) => {
      enqueueSnackbar(JSON.stringify(err), { variant: "error" });
    },
    // onSuccess: (suc) => {
    //   enqueueSnackbar(JSON.stringify(suc), { variant: "error" });
    // },
  });

  const addUserM = useMutation(["addUser"], addUser, {
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  if (isLoading) return <>Loading</>;
  // if (isFetching) return <>Refreshing</>;
  if (!data) return <>Undefined</>;
  if (!data.users.length) return <>No results</>;

  return (
    <div>
      <button
        onClick={() => {
          addUserM.mutate({
            firstName: "fake name",
            lastName: "fake lastname",
            age: 22,
          });
        }}
      >
        Add User trigger
      </button>
      <br />

      <button onClick={() => refetch()} disabled={isFetching || isLoading}>
        {isFetching ? "Fetching" : "Refresh"}
      </button>

      {data.users.map((user) => (
        <div key={user.id}>{user.username}</div>
      ))}
    </div>
  );
};

export default UsersPage;
