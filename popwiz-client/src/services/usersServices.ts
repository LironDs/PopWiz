import axios from "axios";
import User from "../interfaces/User";
import { jwtDecode } from "jwt-decode";
import { TokenDetails } from "../App";

let api: string = `${process.env.REACT_APP_API}/users`;
type userLogin = Pick<User, "email" | "password">;

////Register
export function addUser(newUser: User) {
  return axios.post(`http://localhost:10000/api/register`, newUser);
}
///Login
export function checkUser(userToCheck: userLogin) {
  return axios.post(`http://localhost:10000/api/login`, userToCheck);
}

////Update user
export function updateUser(_id: string, updatedUser: User) {
  return axios.put(`${api}/${_id}`, updatedUser, {
    headers: {
      Authorization: sessionStorage.getItem("token") as string,
    },
  });
}
export function getUserById(_id: string) {
  return axios.get(`${api}/${_id}`, {
    headers: {
      Authorization: sessionStorage.getItem("token") as string,
    },
  });
}
export function getUsers() {
  return axios.get(api, {
    headers: {
      Authorization: sessionStorage.getItem("token") as string,
    },
  });
}

export function deleteUser(_id: string) {
  return axios.delete(`${api}/${_id}`, {
    headers: {
      Authorization: sessionStorage.getItem("token") as string,
    },
  });
}

export function getTokenDetails(): TokenDetails | null {
  const storedToken = sessionStorage.getItem("token");

  // Check if the token is present
  if (!storedToken) {
    return null; // No token available
  }

  try {
    // Attempt to decode the token
    const decodedToken: TokenDetails = jwtDecode(storedToken);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null; // Handle the case where decoding fails
  }
}
