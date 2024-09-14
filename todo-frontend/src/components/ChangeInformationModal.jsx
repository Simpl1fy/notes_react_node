import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";


export default function ChangeInformationModal ({ isOpen, closeModal, type, token, setSuccess, setMessage, toggleToast, isUpdated, setIsUpdated }) {
  const [text, setText] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    console.log(type);
    if(type === 'email') {
      setText('Email');
    } else {
      setText('Password');
    }
  }, [type])

  const handleUpdate = async () => {
    try {
      if(type === 'email') {
        const value = {
          email: input
        }
        const res = await axios.put('http://localhost:5000/update/email', value,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (res.data.success) {
          console.log("Email Updated Succesfully");
          setInput('');
          setSuccess(true);
          setMessage(res.data.message);
          setIsUpdated(!isUpdated);
          closeModal();
          toggleToast();
        } else {
          console.log("Email Updation Failed");
          setInput('');
          setSuccess(false);
          setMessage(res.data.message);
          closeModal();
          toggleToast();
        }
      }
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <Modal
      show={isOpen}
      onHide={closeModal}
    >
      <Modal.Header closeButton>
        Change {text}
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="input" className="form-label">New {text}</label>
            <input type={type === 'email' ? 'email': 'password'} className="form-control" id="input" value={input} onChange={e => setInput(e.target.value)} placeholder={type === 'email'? 'Please Enter new Email':'Please Enter new password'} />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={closeModal}>Cancel</Button>
        <Button variant="primary" onClick={handleUpdate}>Update</Button>
      </Modal.Footer>
    </Modal>
  )
}