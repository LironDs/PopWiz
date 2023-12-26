import { useFormik } from "formik";
import { FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addUser, getTokenDetails } from "../services/usersServices";
import { userInfo } from "os";
import { successMsg } from "../services/feedbacksServices";

interface RegisterProps {
  setUserInfo: Function;
  userInfo: any;
}

const Register: FunctionComponent<RegisterProps> = ({ setUserInfo, userInfo }) => {
  const navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required().min(2),
      lastName: yup.string().required().min(2),
      email: yup.string().required().email(),
      password: yup
        .string()
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d.*\d.*\d)(?=.*[!@#$%^&*-_]).{8,}$/,
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, at least 4 numbers, and one special character"
        )
        .required(),
    }),
    onSubmit(values) {
      addUser({ ...values, isAdmin: false })
        .then((res) => {
          navigate("/");
          successMsg(`You have registered successfully and logged in as ${values.email}`);
          sessionStorage.setItem("token", res.data);
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
      <div className="container text-center" style={{ minHeight: "73vh" }}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex row align-items-center justify-content-center mb-3 ">
            <div className="col-md-5">
              <div style={{ fontSize: "60px" }}>WELCOME TO</div>
            </div>
            <div className="col-md-6" style={{}}>
              <img
                src="/logo-black2.png"
                alt="logo-black"
                style={{ maxWidth: "400px", marginLeft: "10px" }}
              />
            </div>
          </div>
          <div>
            <div className="row mb-2 justify-content-center">
              <div className="form-floating col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="firstName"> First name</label>
                {formik.touched.firstName && formik.errors.firstName && (
                  <small className="text-danger">{formik.errors.firstName}</small>
                )}
              </div>
              <div className="form-floating col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="lastName">Last name</label>
                {formik.touched.lastName && formik.errors.lastName && (
                  <small className="text-danger">{formik.errors.lastName}</small>
                )}
              </div>
            </div>
            <div className="row mb-2 justify-content-center">
              <div className="form-floating col-md-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="email"> email</label>
                {formik.touched.email && formik.errors.email && (
                  <small className="text-danger">{formik.errors.email}</small>
                )}
              </div>
              <div className="form-floating  col-md-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="password">Password</label>
                {formik.touched.password && formik.errors.password && (
                  <small className="text-danger">{formik.errors.password}</small>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-success px-0.5 col-md-6"
            disabled={!formik.isValid || !formik.dirty}
          >
            Register
          </button>
          <Link className="row justify-content-center" to="/">
            Already have user? Login here
          </Link>
        </form>
      </div>
    </>
  );
};

export default Register;
