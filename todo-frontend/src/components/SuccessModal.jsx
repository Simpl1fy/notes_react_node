import {Modal, Button} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

export default function SuccessModal({ isOpen, onRequestClose, message }) {
  
  const navigate = useNavigate();

  const handleClick = () => {
    onRequestClose();
    navigate('/home');
  }

  return (
    <div>
      <Modal
        show={isOpen}
        onHide={onRequestClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClick}>Go to Home</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
