import { FunctionComponent, useEffect, useState } from "react";
import Cart from "../interfaces/Cart";
import { addOrRemoveProduct, getCart, updateCart } from "../services/cartsServices";
import Product from "../interfaces/Product";
import { Link } from "react-router-dom";
import { error } from "console";

interface UserCartProps {
  setUserInfo: Function;
  userInfo: any;
}

const UserCart: FunctionComponent<UserCartProps> = ({ userInfo, setUserInfo }) => {
  let [products, setProducts] = useState<Product[]>([]);
  let [CartChanged, setCartChanged] = useState<boolean>(false);

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
              </tbody>
            </table>
            <div>
              <button type="button" className="btn btn-success ">
                <i className="bi bi-credit-card"> Pay Now</i>
              </button>
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
