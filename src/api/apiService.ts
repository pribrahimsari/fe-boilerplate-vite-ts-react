import axios from "axios";
import { GetUsersQueryResult, GetUsersQueryVariables, User } from "src/types/UserTypes.ts";
import { GetProductsQueryResult } from "src/types/ProductTypes.ts";

const BASE_URL = import.meta.env.VITE_DUMMYJSON_API_URL;

// USERS
export const getUsers = ({ limit, skip }: GetUsersQueryVariables): Promise<GetUsersQueryResult> => {
  const url = new URL("users", BASE_URL);

  if (limit) url.searchParams.append("limit", limit.toString());
  if (skip) url.searchParams.append("skip", skip.toString());

  return axios.get(url.href).then((res) => res.data);
};
export const addUser = (newUser: Partial<User>): Promise<User> => {
  const url = new URL("users/add", BASE_URL);
  return axios.post(url.href, newUser).then((res) => res.data);
};

// PRODUCTS
export const getProducts = (): Promise<GetProductsQueryResult> => {
  const url = new URL("products", BASE_URL);
  const { href } = url;
  return axios.get(href).then((res) => res.data);
};
