import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { getProductByLicense } from "../services/productsServices";
import { Link, useNavigate } from "react-router-dom";
import { updateCart } from "../services/cartsServices";
import Footer from "./Footer";

interface HomeProps {
  setUserInfo: Function;
  userInfo: any;
  searchValue: string;
  setSearchValue: any;
  onDisplay: () => void;
  onHide: () => void;
}

const Home: FunctionComponent<HomeProps> = ({
  userInfo,
  searchValue,
  setSearchValue,
  onDisplay,
  onHide,
}) => {
  // let navigate = useNavigate();
  let [products, setProducts] = useState<Product[]>([]);
  const [currentLicense, setCurrentLicense] = useState<string | null>(null);

  useEffect(() => {
    // Call onDisplay when Home is displayed
    onDisplay();

    return () => {
      // Call onHide when Home is not displayed anymore
      onHide();
    };
  }, [onDisplay]);
  const handleLicense = async (selectedLicense: string) => {
    try {
      const response = await getProductByLicense(selectedLicense);
      setProducts(response.data);
      setCurrentLicense(selectedLicense);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch all products when the component mounts
    handleLicense("");
  }, []);

  let handleAddToCart = (products: Product) => {
    if (userInfo) {
      updateCart(products)
        .then((res) => alert("Product added to cart!"))
        .catch((err) => console.log(err));
    } else {
      alert("you need to sign in");
    }
  };

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
                    to={`products/products-info/${products._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <img src={products.image} className="card-img-top" alt={products.imageAlt} />
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
                        <button
                          type="button"
                          className="btn mb-2 rounded-pill border-success"
                          onClick={() => handleAddToCart(products)}
                          style={{ backgroundColor: "white" }}
                        >
                          ADD TO CART
                        </button>
                        <button
                          type="button"
                          className="btn mb-2"
                          onClick={() => handleAddToCart(products)}
                        >
                          REMOVE FROM CART
                        </button>
                      </div>
                    </div>
                  </Link>
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
