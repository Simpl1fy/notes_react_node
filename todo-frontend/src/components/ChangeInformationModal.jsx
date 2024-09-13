import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";


export default function ChangeInformationModal ({ isOpen, closeModal, type }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if(type === 'email') {
      setText('Email');
    } else {
      setText('Password');
    }
  }, [])

  return (
    <Modal
      show={isOpen}
      onHide={closeModal}
    >
      <Modal.Header closeButton>
        Change {text}
      </Modal.Header>
      <Modal.Body>
        
      </Modal.Body>
    </Modal>
  )
}