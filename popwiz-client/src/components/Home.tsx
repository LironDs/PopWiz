import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { deleteProduct, getProductByLicense } from "../services/productsServices";
import { Link } from "react-router-dom";
import { getCart, updateCart } from "../services/cartsServices";
import { errorMsg, successMsg } from "../services/feedbacksServices";
import { error } from "console";

interface HomeProps {
  setUserInfo: Function;
  userInfo: any;
  searchValue: string;
  setSearchValue: any;

  onDisplay: () => void;
  onHide: () => void;
}

const Home: FunctionComponent<HomeProps> = ({ userInfo, searchValue, onDisplay, onHide }) => {
  let [products, setProducts] = useState<Product[]>([]);
  const [currentLicense, setCurrentLicense] = useState<string | null>(null);
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
          setUserCart([...userCart, products]);
          successMsg("Product added to cart");
        } else if (action === "remove") {
          setUserCart(userCart.filter((item: any) => item._id !== products._id));
          successMsg("Product removed from cart");
        }
        // add the item to the userCart here
      } else {
        errorMsg("You need to sign in");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteProduct = (_id: string) => {
    if (window.confirm("Delete this product?")) {
      deleteProduct(_id)
        .then((res) => {
          successMsg("Product deleted successfully");
          setProducts(products.filter((item: Product) => item._id !== _id));
        })

        .catch((error) => console.error(error));
    }
  };
  useEffect(() => {
    console.log("Calling useEffect");

    onDisplay();
    handleLicense("");

    //Check if userInfo is defined before accessing _id
    if (userInfo && userInfo._id) {
      getCart(userInfo._id)
        .then((res) => setUserCart(res.data))
        .catch((err) => console.log(err));
    }

    return () => {
      console.log("Calling onHide");

      // Call onHide when Home is not displayed anymore
      onHide();
    };
  }, [onDisplay]);

  return (
    <>
      <div className="container pt-3" style={{ position: "relative", minHeight: "66vh" }}>
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
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {!!userCart.find((item: Product) => item._id === products._id) ? (
                      <button
                        type="button"
                        className="btn my-2 rounded-pill"
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
                    {userInfo.isAdmin && (
                      <div style={{ border: "2px solid #48937e", borderRadius: "8px" }}>
                        <Link to={`products/update-product/${products._id}`}>
                          <i className="bi bi-pencil-square px-1"></i>
                        </Link>
                        <Link to={""} onClick={() => handleDeleteProduct(products._id as string)}>
                          <i className="bi bi-trash text-danger"></i>
                        </Link>
                      </div>
                    )}
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
