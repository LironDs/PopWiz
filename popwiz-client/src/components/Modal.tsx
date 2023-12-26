import React, { useState } from "react";
import { FunctionComponent } from "react";
import { emptyCart } from "../services/cartsServices";
import { Navigate, useNavigate } from "react-router-dom";

interface ModalProps {
  userInfo: any;
}

const Modal: FunctionComponent<ModalProps> = ({ userInfo }) => {
  let navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEmptyCart = () => {
    emptyCart(userInfo._id);
    handleCloseModal();
    navigate("/");
  };
  return (
    <>
      <button type="button" className="btn btn-primary " onClick={handleShowModal}>
        <i className="bi bi-credit-card"> Pay Now</i>
      </button>

      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        id="exampleModalCenter"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        tabIndex={-1}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Thank you for your Payment!
              </h5>
              <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">Your order will be processed and delivered in 2-4 days</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary btn-lg" onClick={handleEmptyCart}>
                SUPERB!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
