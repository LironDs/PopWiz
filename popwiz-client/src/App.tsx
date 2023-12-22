import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import { getTokenDetails } from "./services/usersServices";
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import Navbar from "./components/Navbar";
import UserProfile from "./components/UserProfile";
import UserCart from "./components/UserCart";
import CRM from "./components/CRM";
import ProductInfo from "./components/ProductInfo";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import About from "./components/About";
import { getCart } from "./services/cartsServices";
import Product from "./interfaces/Product";
import { ToastContainer } from "react-toastify";

export interface TokenDetails {
  _id: string;
  name: string;
  isAdmin: boolean;
}
function App() {
  let [userInfo, setUserInfo] = useState<TokenDetails | false>(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSearchField, setShowSearchField] = useState(false);
  const [userCart, setUserCart] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails: TokenDetails | null = getTokenDetails();
        setUserInfo(userDetails || false);

        if (userDetails) {
          const cartData = await getCart(userDetails._id);
          setUserCart(cartData.data);
          console.log("User Cart:", cartData.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {/* <Modal /> */}
      <ToastContainer />
      <Router>
        <Navbar
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          setUserInfo={setUserInfo}
          userInfo={userInfo}
          showSearchField={showSearchField}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
                userCart={userCart}
                setUserCart={setUserCart}
                onDisplay={() => setShowSearchField(true)}
                onHide={() => setShowSearchField(false)}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setUserInfo={setUserInfo} userInfo={userInfo} />} />
          <Route
            path="products/add-product"
            element={<AddProduct setUserInfo={setUserInfo} userInfo={userInfo} />}
          />
          <Route
            path="/register"
            element={<Register setUserInfo={setUserInfo} userInfo={userInfo} />}
          />
          <Route
            path="products/update-product/:_id"
            element={<UpdateProduct setUserInfo={setUserInfo} userInfo={userInfo} />}
          />
          <Route
            path="products/product-info/:_id"
            element={<ProductInfo setUserInfo={setUserInfo} userInfo={userInfo} />}
          />
          <Route
            path="users/user-profile/:_id"
            element={<UserProfile setUserInfo={setUserInfo} userInfo={userInfo} />}
          />
          <Route
            path="users/user-cart"
            element={<UserCart setUserInfo={setUserInfo} userInfo={userInfo} />}
          />
          <Route path="crm" element={<CRM userInfo={userInfo} setUserInfo={setUserInfo} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
