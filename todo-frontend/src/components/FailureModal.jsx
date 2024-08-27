// import React from 'react'
import Modal from "react-modal";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

export default function FailureModal({ isOpen, onRequestClose, message, link }) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={{ width: "50px" }}
      >
        <div className="d-flex flex-column align-content-center justify-content-center">
          <div className="heading">
            <h2>
              <strong>Failed</strong>
            </h2>
          </div>
          <div>{message}</div>

          <Link
            to={link}
            onClick={onRequestClose}
            className="btn btn-primary"
            style={{ textDecoration: "none", color: "white" }}
          >
            Try Again
          </Link>
        </div>
      </Modal>
    </div>
  )
}
