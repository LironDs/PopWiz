import axios from "axios";

import Product from "../interfaces/Product";

let api: string = `${process.env.REACT_APP_API}/cart`;

export function getCart(userId: string) {
  return axios.get(api, {
    headers: {
      Authorization: sessionStorage.getItem("token") as string,
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
        Authorization: sessionStorage.getItem("token") as string,
      },
    });
  } catch (error) {
    throw error;
  }
}
export async function emptyCart(userId: string) {
  try {
    return await axios.put(`${api}/empty-cart/${userId}`);
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
