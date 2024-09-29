import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "../config/axiosConfig";


export default function ChangeInformationModal ({ isOpen, closeModal, type, token, setSuccess, setMessage, toggleToast, isUpdated, setIsUpdated }) {
  const [text, setText] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    if(type === 'email') {
      setText('Email');
    } else {
      setText('Password');
    }
  }, [type])

  const handleUpdate = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      if(type === 'email') {
        const value = {
          email: input
        }
        const res = await api.put('/update/email', value, config);

        if (res.data.success) {
          setInput('');
          setSuccess(true);
          setMessage(res.data.message);
          setIsUpdated(!isUpdated);
          closeModal();
          toggleToast();
        } else {
          setInput('');
          setSuccess(false);
          setMessage(res.data.message);
          closeModal();
          toggleToast();
        }
      } else {
        const value = {
          password: input
        }
        const res = await api.put('/update/password', value, config);

        if(res.data.success) {
          setInput('');
          setSuccess(true);
          setMessage(res.data.message);
          setIsUpdated(!isUpdated);
          closeModal();
          toggleToast();
        } else {
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