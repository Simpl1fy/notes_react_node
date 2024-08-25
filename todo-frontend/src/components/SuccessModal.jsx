import Modal  from 'react-modal'
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

export default function SuccessModal({ isOpen, onRequestClose, heading, message }) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        <h2>{heading}</h2>
        <div>{message}</div>
        <Link to={"/home"} onClick={onRequestClose}>Go to Home Page</Link>
      </Modal>
    </div>
  )
}
