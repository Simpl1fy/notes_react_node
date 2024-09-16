import { Link } from "react-router-dom"
import { useState } from "react";
import SuccessModal from "./SuccessModal";
import FailureModal from "./FailureModal";
import { useAuth } from "./useAuth";
import api from "../config/axiosConfig";

export default function Login() {
  const { login } = useAuth();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [failureModalIsOpen, setFailureModalIsOpen] = useState(false);
  const [message, setMessage] = useState('')

  const openModal = (setModalState) => {
    setModalState(true);
  }
  const closeModal = (setModalState) => {
    setModalState(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const res = await api.post('/login', {
      email: email,
      password: password
    })
    setMessage(res.data.message);
    if(res.data.success) {
      const generatedToken = res.data.token;
      login(generatedToken);
      openModal(setSuccessModalIsOpen);
    } else {
      openModal(setFailureModalIsOpen);
    }
    } catch(err) {
      console.error(err);
    }
    
  }
  


  return (
    <div className="form-container px-3 py-3 d-flex justify-content-center align-items-center">
      <form className="bg-light px-3 py-3 border border-2 rounded-2 border-dark w-25" onSubmit={handleSubmit}>
        <h2 className="mb-3">Login</h2>
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
            required
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
            placeholder="Please enter your password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
        <div className="pt-2">
            Don&apos;t have an account?
            <Link to={"/signup"} className="px-2 text-decoration-none">
              <strong>Create One</strong>
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
        link="/login"
      />
    </div>
  )
}
