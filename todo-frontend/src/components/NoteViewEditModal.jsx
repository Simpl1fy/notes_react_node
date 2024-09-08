// import React from 'react'
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function NoteViewEditModal({ isOpen, closeModal, isDisabled, heading, content }) {

  const [editHeading, setEditHeading] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    console.log(heading);
    console.log(content);
    setEditHeading(heading);
    setEditContent(content);
  }, [heading, content, isOpen])

  return (
    <div>
      <Modal
        show={isOpen}
        onHide={closeModal}
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
                  onChange={(e) => setEditHeading(e.target.value)}
                  disabled={isDisabled}
                  value={editHeading}
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
                  rows="20"
                  onChange={(e) => setEditContent(e.target.value)}
                  disabled={isDisabled}
                  value={editContent}
                ></textarea>
              </div>
            </form>
        </div>
        </Modal.Body>
        <Modal.Footer>
          {isDisabled ?
            <>
              <Button variant='danger' onClick={closeModal}>Close</Button>
            </> :
            <>
              <Button variant='primary'>Save</Button>
              <Button variant='danger' onClick={closeModal}>Close</Button>
            </>
          }
        </Modal.Footer>
      </Modal>
    </div>
  )
}
