import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { getProductByLicense } from "../services/productsServices";
import { Link, useNavigate } from "react-router-dom";
import { getCart, updateCart } from "../services/cartsServices";
import Footer from "./Footer";
import { log } from "console";
import { errorMsg, successMsg } from "../services/feedbacksServices";

interface HomeProps {
  setUserInfo: Function;
  userInfo: any;
  searchValue: string;
  setSearchValue: any;
  userCart: [];
  setUserCart: any;
  onDisplay: () => void;
  onHide: () => void;
}

const Home: FunctionComponent<HomeProps> = ({
  userInfo,
  searchValue,
  setSearchValue,
  // userCart,
  // setUserCart,
  onDisplay,
  onHide,
}) => {
  let [products, setProducts] = useState<Product[]>([]);
  const [currentLicense, setCurrentLicense] = useState<string | null>(null);
  const [inCart, setInCart] = useState<boolean>(true || false);
  const [userCart, setUserCart] = useState<any>([]);

  const handleLicense = async (selectedLicense: string) => {
    try {
      const response = await getProductByLicense(selectedLicense);
      setProducts(response.data);
      setCurrentLicense(selectedLicense);
    } catch (error) {
      console.log(error);
    }
  };

  let handleAddToCart = async (products: Product) => {
    try {
      if (userInfo) {
        const res = await updateCart(products);
        const { action, message } = res.data;

        if (action === "add") {
          successMsg("Product added to cart");
        } else if (action === "remove") {
          successMsg("Product removed from cart");
        }
        // setInCart(!inCart);
      } else {
        errorMsg("You need to sign in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onDisplay();
    handleLicense("");
    getCart(userInfo._id)
      .then((res) => setUserCart(res.data))
      .catch((err) => console.log(err));
    return () => {
      // Call onHide when Home is not displayed anymore
      onHide();
    };
  }, [onDisplay, userCart]);

  return (
    <>
      <div className="container pt-5" style={{ position: "relative", minHeight: "66vh" }}>
        <div className="container mb-3 row align-items-center ">
          <div className="col-md-4 text-center">
            <h1>Choose your PoP! :</h1>
          </div>
          <div className="col-md text-center">
            <a>
              <img
                src="/Marvel.png"
                alt="Marvel-logo"
                width={"120px"}
                onClick={() => handleLicense("MARVEL")}
              />
            </a>
          </div>

          <div className="col-md text-center">
            <a>
              <img
                src="/dcLogo.jpg"
                alt="DC Logo"
                width={"120px"}
                onClick={() => handleLicense("DC COMICS")}
              />
            </a>
          </div>
          <div className="col-md text-center">
            <a>
              <img
                src="/DisneyLogo.png"
                alt="Disney-logo"
                width={"100px"}
                onClick={() => handleLicense("DISNEY")}
              />
            </a>
          </div>
        </div>
        <div className="container row justify-content-center mb-5">
          {products.length ? (
            products
              .filter((item) => {
                return searchValue.toLowerCase() == "" || searchValue.toUpperCase() == ""
                  ? item
                  : item.name.toLowerCase().includes(searchValue) ||
                      item.name.toUpperCase().includes(searchValue);
              })
              .map((products: Product) => (
                <div
                  key={products._id}
                  className="card bg-light mx-2"
                  style={{ width: "18rem", marginBottom: "10px" }}
                >
                  <i className="bi bi-heart text-danger text-end"></i>
                  <Link
                    to={`products/product-info/${products._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <img src={products.image} className="card-img-top" alt={products.imageAlt} />
                  </Link>
                  <div
                    className="card-body"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p className="card-text">{products.license}</p>
                    <p className="card-text">{products.name}</p>
                    <h5 className="card-title">{products.price}$</h5>
                    <div className=" px-3">
                      {/* <button
                        type="button"
                        className="btn mb-2 rounded-pill border-success"
                        onClick={() => handleAddToCart(products)}
                      > */}
                      {!!userCart.find((item: Product) => item._id === products._id) ? (
                        <button
                          type="button"
                          className="btn mb-2 rounded-pill"
                          onClick={() => handleAddToCart(products)}
                          style={{ backgroundColor: "black", color: "white" }}
                        >
                          REMOVE FROM CART
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn mb-2 rounded-pill"
                          onClick={() => handleAddToCart(products)}
                          style={{ backgroundColor: "lightGray", color: "black" }}
                        >
                          ADD TO CART
                        </button>
                      )}
                      {/* </button> */}
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <h4>no products here</h4>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
