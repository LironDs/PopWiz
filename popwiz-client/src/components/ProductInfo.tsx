import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productsServices";
import Product from "../interfaces/Product";

interface ProductInfoProps {
  setUserInfo: Function;
  userInfo: any;
}

const ProductInfo: FunctionComponent<ProductInfoProps> = ({ userInfo }) => {
  let { _id } = useParams();

  let [product, setProduct] = useState<Product>({
    name: "",
    license: "",
    description: "",
    image: "",
    imageAlt: "",
    price: 0,
    category: "",
    inStock: "",
  });

  useEffect(() => {
    getProductById(String(_id))
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleAddToCart(product: Product): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="container" style={{ minHeight: "66vh" }}>
        <div className="row align-content-between d-flex">
          <div className="col-lg" style={{ backgroundColor: "rgb(240, 245, 245" }}>
            {/* <i
            className="bi bi-heart text-danger"
            style={{ fontSize: "30px", position: "absolute", marginLeft: "10px" }}
          ></i> */}
            <img
              src={product.image}
              alt={product.imageAlt}
              style={{ width: "100%", height: "auto", maxWidth: "650px" }}
            />
          </div>
          <div className="col-lg mt-3">
            <h6>{product.license}</h6>
            <h2>
              <strong>{product.name}</strong>
            </h2>
            <h4>{product.price}$</h4>
            <div>
              <button
                type="button"
                className="btn rounded-pill border-success"
                onClick={() => handleAddToCart(product)}
                style={{
                  color: "white",
                  backgroundColor: "rgb(43 48 53)",
                }}
              >
                ADD TO CART
              </button>
            </div>
            <hr />
            <h5>Product details</h5>
            <h6>{product.description}</h6>
            <h6>Item serial number: {product._id}</h6>
            <h6>Category: {product.category}</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
