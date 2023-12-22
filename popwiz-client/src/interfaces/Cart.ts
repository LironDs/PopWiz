import Product from "./Product";

export default interface Cart {
  _id?: string;
  userId: number;
  products: Product[];
  // active?: boolean;
}
