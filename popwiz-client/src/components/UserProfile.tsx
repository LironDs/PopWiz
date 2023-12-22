import { FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import User from "../interfaces/User";
import { getUserById, updateUser } from "../services/usersServices";
import { useFormik } from "formik";
import { errorMsg, successMsg } from "../services/feedbacksServices";

interface UserProfileProps {
  setUserInfo: Function;
  userInfo: any;
}

const UserProfile: FunctionComponent<UserProfileProps> = ({ userInfo, setUserInfo }) => {
  const navigate = useNavigate();

  let { _id } = useParams();
  let [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(_id);

    getUserById(String(_id))
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  let formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    },
    enableReinitialize: true,

    validationSchema: yup.object({
      firstName: yup.string().required().min(2),
      lastName: yup.string().required().min(2),
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
    onSubmit: (values) => {
      console.log(_id);
      updateUser(String(_id), values)
        .then((res) => {
          navigate("/");
          successMsg("user updated successfully!");
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            errorMsg(error.response.data); // Display the error message in an feedback msg
          } else {
            console.error("Error:", error);
          }
        });
    },
  });
  return (
    <>
      <div className="container text-center" style={{ minHeight: "70vh" }}>
        <form onSubmit={formik.handleSubmit}>
          <h2>Update Profile</h2>
          <div className="row mb-2 justify-content-center">
            <div className="form-floating col-md-3">
              <input
                type="text"
                className="form-control"
                id="firstName"
                // placeholder="John Doe"
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
                // placeholder="John Doe"
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
                // placeholder="John Doe"
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
            <div className="form-floating col-md-3 mb-2">
              <input
                type="password"
                className="form-control"
                id="password"
                // placeholder="John Doe"
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
            className="btn btn-success px-0.5 col-md-5"
            disabled={!formik.isValid || !formik.dirty}
          >
            Update!
          </button>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
