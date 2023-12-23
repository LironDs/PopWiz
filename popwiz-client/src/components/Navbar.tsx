import { FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TokenDetails } from "../App";
import { successMsg } from "../services/feedbacksServices";

interface NavbarProps {
  setUserInfo: Function;
  userInfo: TokenDetails | false;
  searchValue: string;
  setSearchValue: any;
  showSearchField: any;
}
const Navbar: FunctionComponent<NavbarProps> = ({
  userInfo,
  setUserInfo,
  searchValue,
  setSearchValue,
  showSearchField,
}) => {
  let navigate = useNavigate();

  let render = () => setUserInfo(!userInfo);

  let logout = () => {
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("token");
    navigate("/");
    successMsg("You have logged out!");
    render();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark px-4" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/logo-no-background.png" alt="Bootstrap" width="150" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/about">
                  About
                </Link>
              </li>
              {userInfo && userInfo.isAdmin && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" to="crm">
                      CRM-Admin Panel
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <ul className="navbar-nav px-2  justify-content-center">
              {showSearchField && (
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </form>
              )}
              {!userInfo && (
                <>
                  <li className="nav-item ">
                    <Link className="nav-link active" aria-current="page" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/login">
                      SignIn
                    </Link>
                  </li>
                </>
              )}

              {userInfo && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"users/user-cart"}>
                      <i className="bi bi-basket3" style={{ fontSize: "25px", color: "white" }}></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={`users/user-profile/${userInfo._id}`}>
                      <i
                        className="bi bi-person-circle"
                        style={{ fontSize: "25px", color: "white" }}
                      />
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={logout}>
                      <i
                        className="bi bi-box-arrow-right"
                        style={{ color: "white", fontSize: "25px" }}
                      ></i>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div
        style={{
          borderTop: "0.3px solid rgba(255, 255, 255, 0.3)",
          backgroundColor: "rgb(43 48 53)",
          color: "white",
          textAlign: "center",
          lineHeight: "40px",
          marginBottom: "20px",
        }}
      >
        Free Shipping On Orders $65+
      </div>
    </>
  );
};

export default Navbar;
