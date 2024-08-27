import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import SuccessModal from "./SuccessModal";
import FailureModal from "./FailureModal";



export default function Signup() {
  const [formName, setName] = useState('');
  const [formEmail, setEmail] = useState('');
  const [formPassword, setPassword] = useState('');
  const [message, setMessage] = useState('')
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [failureModalIsOpen, setFailureModalIsOpen] = useState(false);
  const openModal = (setModalState) => {
    setModalState(true);
  }
  const closeModal = (setModalState) => {
    setModalState(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/signup', {
        name: formName,
        email: formEmail,
        password: formPassword
      });
      console.log(res.status);
      console.log(res.data.success);
      console.log(res.data.message);
      if(res.data.success) {
        setMessage(res.data.message);
        openModal(setSuccessModalIsOpen);
      } else {
        setMessage(res.data.message);
        openModal(setFailureModalIsOpen);
      }
    } catch(err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Could not sign up")
    }
  }
  return (
    <div className="form-container bg-primary vh-100 px-3 py-3 d-flex justify-content-center align-items-center">
      <form className="bg-light px-3 py-3 border border-2 rounded-2 border-dark w-25" onSubmit={handleSubmit} action="" method="post">
        <h2 className="mb-3">Signup</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            <strong>Name:</strong>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
            autoComplete="true"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <strong>Email:</strong>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="xyz@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="true"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <strong>Password:</strong>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </div>
        <div className="pt-2">
            Already have an account?
            <Link to={"/login"} className="px-2 text-decoration-none">
              <strong>Login</strong>
            </Link>
        </div>
      </form>
      <SuccessModal
        isOpen={successModalIsOpen}
        onRequestClose={() => closeModal(setSuccessModalIsOpen)}
        message={message}
      />
      <FailureModal
        isOpen={failureModalIsOpen}
        onRequestClose={() => closeModal(setFailureModalIsOpen)}
        message={message}
      />
    </div>
  );
}
