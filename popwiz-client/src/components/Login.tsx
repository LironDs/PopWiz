import { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { checkUser, getTokenDetails } from "../services/usersServices";
import { log } from "console";
import { errorMsg } from "../services/feedbacksServices";
import { jwtDecode } from "jwt-decode";

interface LoginProps {
  setUserInfo: Function;
  userInfo: any;
}

const Login: FunctionComponent<LoginProps> = ({ userInfo, setUserInfo }) => {
  let navigate = useNavigate();

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
    onSubmit(values) {
      checkUser(values)
        .then((res) => {
          const token = res.data;
          const decodedUser = jwtDecode(token);

          // Set the decoded user information in the userInfo state
          setUserInfo(decodedUser);

          // Store the token in sessionStorage
          sessionStorage.setItem("token", token);

          navigate("/");
        })
        .catch((err) => errorMsg("Wrong email or password"));
    },
  });
  return (
    <>
      <div className="container" style={{ minHeight: "66vh" }}>
        <form onSubmit={formik.handleSubmit} className="col-6 mx-auto">
          <h2>Login</h2>

          <div className="mb-2">
            <div className="form-floating">
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
            <div className="form-floating">
              <input
                type="text"
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
          <button
            type="submit"
            className="btn btn-success px-0.5 col-md-3"
            disabled={!formik.isValid || !formik.dirty}
          >
            Login
          </button>
          <Link className="row justify-content-center" to="/register">
            Not a user yet? Register here
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
