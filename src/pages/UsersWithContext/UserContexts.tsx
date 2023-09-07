import React, { createContext, useContext } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getUsers } from "src/api/apiService.ts";
import { GetUsersQueryResult } from "src/types/UserTypes.ts";

const UserContext = createContext<UseQueryResult<GetUsersQueryResult> | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const usersQ = useQuery(["users"], () => getUsers({ limit: 50 }), {
    refetchOnWindowFocus: false,
  });

  return <UserContext.Provider value={usersQ}>{children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) throw new Error("Context must be defined");

  return context;
};
