export default interface Product {
  _id?: string;
  image?: string;
  imageAlt?: string;
  license: string;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock?: string;
}
