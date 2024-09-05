// import React from 'react'
import {Modal, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function FailureModal({ isOpen, onRequestClose, message, link }) {

  const navigate = useNavigate();

  const handleClick = () => {
    onRequestClose();
    navigate(link);
  }

  return (
    <div>
      <Modal
        show={isOpen}
        onHide={onRequestClose}
        backdrop="static"
        keyboard={false}
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
