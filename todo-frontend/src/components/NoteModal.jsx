import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

export default function NoteModal({ isOpen, closeModal, handleChange, setSuccess, setMessage, toggleToast }) {

  // states for text input
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');

  // getting the token
  const token = localStorage.getItem('token');

  // function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {Authorization: `Bearer ${token}`}
    }
    const bodyParameters = {
      heading: heading,
      content: content
    }
    const res = await axios.post('http://localhost:5000/note/submit', bodyParameters, config)
    if(res.data.success) {
      console.log("Your note has been saved successfully");
      handleChange();
      setSuccess(true);
      setMessage(res.data.message);
    } else {
      console.log("It was not success!");
      setSuccess(false);
      setMessage(res.data.message);
    }
    toggleToast();
  }

  // function for handling close button
  const handleClose = () => closeModal();

  return (
    <div>
      <Modal
        show={isOpen}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-container px-3 py-3">
            <form className="px-auto border border-2 border-dark p-3 rounded-4 bg-light">
              <div className="mb-3">
                <label htmlFor="heading" className="form-label">
                  <strong>Heading</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="headingInput"
                  placeholder="Enter the heading of your task"
                  onChange={(e) => setHeading(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="explanation" className="form-label">
                  <strong>Explanation</strong>
                </label>
                <textarea
                  name="explain"
                  id="explanationBox"
                  className="form-control"
                  rows="5"
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
            </form>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleSubmit}>Save</Button>
          <Button variant='danger' onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
