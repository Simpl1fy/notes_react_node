// import React from 'react'
import {Modal, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function FailureModal({ isOpen, onRequestClose, message, link, setSpinner }) {

  const navigate = useNavigate();

  const handleClick = () => {
    onRequestClose();
    setSpinner(false);
    navigate(link);
  }

  const handleClose = () => {
    onRequestClose();
    navigate(link);
  }

  return (
    <div>
      <Modal
        show={isOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          Failed
        </Modal.Header>
        <Modal.Body>
          {message}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClick}>Try Again</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
