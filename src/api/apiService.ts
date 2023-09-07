import axios from "axios";
import { GetUserQueryResult, User } from "src/types/UserTypes.ts";

const BASE_URL = import.meta.env.VITE_DUMMYJSON_API_URL;

export const getUsers = (): Promise<GetUserQueryResult> => {
  const url = new URL("users", BASE_URL);
  return axios.get(url.href).then((res) => res.data);
};

export const addUser = (newUser: Partial<User>): Promise<User> => {
  const url = new URL("users/add", BASE_URL);
  return axios.post(url.href, newUser).then((res) => res.data);
};
