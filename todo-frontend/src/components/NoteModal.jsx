import { Modal, Button } from "react-bootstrap";
import { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from 'jodit-react';
import { useAuth } from "./useAuth";
import api from "../config/axiosConfig";

export default function NoteModal({ isOpen, closeModal, handleChange, setSuccess, setMessage, toggleToast }) {

  // states for text input
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');

  // getting the token
  const { localToken } = useAuth();

  const editor = useRef(null);

  const config = useMemo(() => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: 'Start typing...'
    }), []);

    useEffect(() => {
      console.log("Token is = ", localToken);
    }, [])


  // function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {Authorization: `Bearer ${localToken}`}
    }
    const bodyParameters = {
      heading: heading,
      content: content
    }
    const res = await api.post('/note/submit', bodyParameters, config)
    if(res.data.success) {
      console.log("Your note has been saved successfully");
      handleChange();
      setSuccess(true);
      setMessage(res.data.message);
      closeModal();
    } else {
      console.log("It was not success!");
      setSuccess(false);
      setMessage(res.data.message);
      closeModal();
    }
    toggleToast();
  }

  // function for handling close button
  const handleClose = () => {
    setContent('');
    setHeading('');
    closeModal();
  }

  return (
    <div>
      <Modal
        show={isOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='xl'
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
                  className="form-control form-control-lg"
                  id="headingInput"
                  placeholder="Enter the heading of your Note"
                  onChange={(e) => setHeading(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="explanation" className="form-label">
                  <strong>Explanation</strong>
                </label>
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  tabIndex={1}
                  onBlur={newContent => setContent(newContent)}
                  onChange={newContent => setContent(newContent)}
                />
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
