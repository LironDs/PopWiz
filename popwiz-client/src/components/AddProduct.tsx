import { useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addProduct } from "../services/productsServices";
import { errorMsg, successMsg } from "../services/feedbacksServices";

interface AddProductProps {
  setUserInfo: Function;
  userInfo: any;
}

const AddProduct: FunctionComponent<AddProductProps> = ({ userInfo, setUserInfo }) => {
  let navigate = useNavigate();
  useEffect(() => {
    formik.setFieldValue("price", "");
  }, []);

  let formik = useFormik({
    initialValues: {
      image: "",
      imageAlt: "",
      license: "",
      name: "",
      price: 0,
      description: "",
      category: "",
      inStock: "true",
    },
    validationSchema: yup.object({
      image: yup.string(),
      imageAlt: yup.string(),
      license: yup.string().required().min(2),
      name: yup.string().required().min(2),
      price: yup.number().required(),
      description: yup.string().required().min(6),
      category: yup.string().required(),
      inStock: yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      addProduct(values)
        .then((res) => {
          navigate("/");
          successMsg("Card added successfully!");
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            errorMsg(error.response.data);
          } else {
            console.error("Error:", error);
          }
        });
    },
  });
  return (
    <>
      <div className="container" style={{ minHeight: "66vh" }}>
        <div className="container form-add">
          <form onSubmit={formik.handleSubmit} className="text-center">
            {/***** FORM *****/}
            <h2 style={{ lineHeight: "2", textDecoration: "underline" }}>Add New Product</h2>
            <div className="row mb-2">
              {/* Product name */}
              <div className="form-floating col">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Product name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="name">Pop Name</label>
                {formik.touched.name && formik.errors.name && (
                  <small className="text-danger">{formik.errors.name}</small>
                )}
              </div>
              {/* license */}
              <div className="form-floating col">
                <input
                  type="text"
                  className="form-control"
                  id="license"
                  placeholder="license"
                  name="license"
                  value={formik.values.license}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="license">Pop license</label>
                {formik.touched.license && formik.errors.license && (
                  <small className="text-danger">{formik.errors.license}</small>
                )}
              </div>
            </div>
            {/* description */}
            <div className="form-floating mb-2 col">
              <textarea
                // rows="3"
                className="form-control"
                id="description"
                placeholder="Product description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="description">Give some description</label>
              {formik.touched.description && formik.errors.description && (
                <small className="text-danger">{formik.errors.description}</small>
              )}
            </div>
            <div className="row mb-2">
              {/* /////image */}
              <div className="form-floating col">
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  placeholder="Image url"
                  name="image"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="image">Image link</label>
                {formik.touched.image && formik.errors.image && (
                  <small className="text-danger">{formik.errors.image}</small>
                )}
              </div>
              {/* imageAlt */}
              <div className="form-floating col">
                <input
                  type="text"
                  className="form-control"
                  id="imageAlt"
                  placeholder="image Alt"
                  name="imageAlt"
                  value={formik.values.imageAlt}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="imageAlt">Image Alt</label>
                {formik.touched.imageAlt && formik.errors.imageAlt && (
                  <small className="text-danger">{formik.errors.imageAlt}</small>
                )}
              </div>
            </div>
            <div className="row mb-2">
              {/* price */}
              <div className="form-floating col">
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  placeholder="Product price"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="price">Price in $</label>
                {formik.touched.price && formik.errors.price && (
                  <small className="text-danger">{formik.errors.price}</small>
                )}
              </div>
              {/* category */}
              <div className="form-floating col">
                <select
                  className="form-control form-select"
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option selected>Choose category</option>
                  <option value="Action & Adventure">Action & Adventure</option>
                  <option value="Animation & Cartoons">Animation & Cartoons</option>
                  <option value="Comics & Superheroes">Comics & Superheroes</option>
                  <option value="Movies & TVs">Movies & TVs</option>
                  <option value="Video Games">Video Games</option>
                  <option value="Music">Music</option>
                  <option value="SciFi">SciFi</option>
                </select>
                <label htmlFor="category">Category</label>
                {formik.touched.category && formik.errors.category && (
                  <small className="text-danger">{formik.errors.category}</small>
                )}
              </div>
              {/* inStock */}
              <div className="form-floating col">
                <select
                  className="form-control form-select"
                  id="inStock"
                  //   placeholder="select category"
                  name="inStock"
                  // value={formik.values.inStock}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {/* <option value="DEFAULT">Choose one</option> */}
                  <option selected>Choose one</option>

                  <option value="true">In Stock</option>
                  <option value="false">Out of stock</option>
                </select>
                <label htmlFor="inStock">is in Stock?</label>
                {formik.touched.inStock && formik.errors.inStock && (
                  <small className="text-danger">{formik.errors.inStock}</small>
                )}
              </div>
            </div>
            <div className="row px-2">
              <button
                type="reset"
                className="btn btn-success col me-1"
                onClick={() => formik.resetForm()}
              >
                RESET FORM
              </button>
              <button type="button" className="btn btn-danger col" onClick={() => navigate(-1)}>
                CANCEL
              </button>
            </div>
            <div className="row p-2 ">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!formik.isValid || !formik.dirty}
              >
                +Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
