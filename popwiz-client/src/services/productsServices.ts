import axios from "axios";
import Product from "../interfaces/Product";

let api: string = `${process.env.REACT_APP_API}/products`;

export function addProduct(newProduct: Product) {
  return axios.post(api, newProduct, {
    headers: {
      Authorization: sessionStorage.getItem("token") as string,
    },
  });
}

////no need for Authorization

export function getProductById(_id: string) {
  return axios.get(`${api}/${_id}`);
}

export function updateProduct(updatedProduct: Product, _id: string) {
  return axios.put(`${api}/${_id}`, updatedProduct, {
    headers: {
      Authorization: sessionStorage.getItem("token") as string,
    },
  });
}

////no need for Authorization

export function getProductByLicense(license = "") {
  if (license) {
    return axios.get(`${api}/${license}`);
  } else {
    return axios.get(api);
  }
}

export const searchProducts = async (searchTerm: string) => {
  try {
    const response = await axios.get(`${api}/search`, {
      params: { searchTerm },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

////delete product by admin
export function deleteProduct(_id: string) {
  return axios.delete(`${api}/${_id}`, {
    headers: {
      Authorization: sessionStorage.getItem("token") as string,
    },
  });
}
