import React, { useState } from "react";
import { FunctionComponent } from "react";

interface ModalProps {}

const Modal: FunctionComponent<ModalProps> = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={handleShowModal}>
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
              <button type="button" className="btn btn-primary btn-lg" onClick={handleCloseModal}>
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
