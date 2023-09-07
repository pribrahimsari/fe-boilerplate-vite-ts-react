import axios from "axios";
import { GetUserQueryResult, User } from "src/types/UserTypes.ts";

const BASE_URL = import.meta.env.VITE_DUMMYJSON_API_URL;

export const getUsers = (): Promise<GetUserQueryResult> => {
  const url = new URL("users", BASE_URL);
  return axios.get(url.href).then((res) => res.data);
};

export const addUser = (): Promise<User> => {
  const url = new URL("users/add", BASE_URL);

  return axios
    .post(url.href, {
      firstName: "First Name",
      lastName: "Last Name",
      age: 25,
    })
    .then((res) => res.data);
};
