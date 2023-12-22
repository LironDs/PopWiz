import axios from "axios";
import User from "../interfaces/User";
import { jwtDecode } from "jwt-decode";
import { TokenDetails } from "../App";
import Cart from "../interfaces/Cart";
import Product from "../interfaces/Product";

let api: string = `${process.env.REACT_APP_API}/cart`;

export function getCart(userId: string) {
  return axios.get(api, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
    },
    data: {
      userId: userId,
    },
  });
}

export async function updateCart(productToAdd: Product) {
  try {
    return await axios.post(api, productToAdd, {
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function addOrRemoveProduct(productToAdd: Product) {
  try {
    const response = await updateCart(productToAdd);
  } catch (error) {
    console.error("An error occurred", error);
  }
}
