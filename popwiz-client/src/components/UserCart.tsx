import { FunctionComponent, useEffect, useState } from "react";
import Cart from "../interfaces/Cart";
import { addOrRemoveProduct, getCart, updateCart } from "../services/cartsServices";
import Product from "../interfaces/Product";
import { Link } from "react-router-dom";
import { error } from "console";
import Modal from "./Modal";

interface UserCartProps {
  setUserInfo: Function;
  userInfo: any;
}

const UserCart: FunctionComponent<UserCartProps> = ({ userInfo, setUserInfo }) => {
  let [products, setProducts] = useState<Product[]>([]);
  let [CartChanged, setCartChanged] = useState<boolean>(false);
  const sum = products ? products.reduce((total, item) => total + item.price, 0) : null;

  useEffect(() => {
    getCart(userInfo._id)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [CartChanged]);

  const handleDeleteFromCart = (product: Product) => {
    updateCart(product)
      .then((res) => setCartChanged(!CartChanged))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="container" style={{ minHeight: "70vh" }}>
        {products.length ? (
          <>
            <table className="table">
              <thead>
                <tr className="table-success">
                  <td>Image</td>
                  <td>Name</td>
                  <td>License</td>
                  <td>price</td>
                  <td>Remove from cart</td>
                </tr>
              </thead>
              <tbody>
                {products.map((product: Product) => (
                  <tr key={product._id}>
                    <td>
                      <img src={product.image} alt="pop image" width={50} />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.license}</td>
                    <td>{product.price}$</td>
                    <td>
                      <Link to="" onClick={() => handleDeleteFromCart(product)}>
                        <i className="bi bi-trash3" style={{ color: "#d23737" }}></i>
                      </Link>
                    </td>
                  </tr>
                ))}
                <tr style={{ border: "3px solid black" }}>
                  <td>Order Subtotal:</td>
                  <td></td>
                  <td></td>
                  <td>{sum}$</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div>
              <Modal />
            </div>
          </>
        ) : (
          <h3>You have no items in your cart</h3>
        )}
      </div>
    </>
  );
};

export default UserCart;
