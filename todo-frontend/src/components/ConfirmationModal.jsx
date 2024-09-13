import { Modal, Button } from "react-bootstrap";

export default function ConfirmationModal({ isOpen, closeModal, id, deleteFunction }) {

    const handleDelete = () => {
      deleteFunction(id);
      closeModal();
    }

    return (
        <Modal
          show={isOpen}
          onHide={closeModal}
        >
          <Modal.Header closeButton>
            Are you sure ?
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this note?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={closeModal}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Yes, Delete</Button>
          </Modal.Footer>
        </Modal>
    )
}