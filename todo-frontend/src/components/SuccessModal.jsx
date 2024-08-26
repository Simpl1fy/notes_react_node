import Modal from "react-modal";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

export default function SuccessModal({ isOpen, onRequestClose, message }) {
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
              <strong>Success</strong>
            </h2>
          </div>
          <div>{message}</div>

          <Link
            to={"/home"}
            onClick={onRequestClose}
            className="btn btn-primary"
            style={{ textDecoration: "none", color: "white" }}
          >
            Go to Home Page
          </Link>
        </div>
      </Modal>
    </div>
  );
}
