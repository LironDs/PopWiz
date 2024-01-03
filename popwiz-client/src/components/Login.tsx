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
        <div
          className="container"
          style={{ textAlign: "center", position: "fixed", bottom: "70px" }}
        >
          <h2>Feel free to register yourself or try one of our users!</h2>
          <table className="table table-bordered w-50 text-center mx-auto">
            <thead>
              <tr className="table-primary">
                <th className="role">role</th>
                <th className="mail">E-mail</th>
                <th className="password">password</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>admin </td>
                <td>admin@gmail.com</td>
                <td>!Q2w3e4r5t</td>
              </tr>
              <tr>
                <td>user </td>
                <td>user@gmail.com </td>
                <td>!Q2w3e4r5t</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Login;
