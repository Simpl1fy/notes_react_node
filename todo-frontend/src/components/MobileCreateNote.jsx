import { Button } from "react-bootstrap";
import { useState, } from "react";
import { useNavigate } from "react-router-dom";
// import JoditEditor from 'jodit-react';
import { useAuth } from "./useAuth";
import api from "../config/axiosConfig";
import ToastFile from "./ToastFile";
// useRef, useMemo, useEffect

export default function MobileCreateNote() {

  const navigate = useNavigate();
  
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');

  // toast
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const toggleToast = () => setShowToast(!showToast);

  const { localToken } = useAuth();

  // const editor = useRef(null);

  // const config = useMemo(() => ({
  //     readonly: false, // all options from https://xdsoft.net/jodit/docs/,
  //     placeholder: 'Start typing...'
  // }), []);

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
      setSuccess(true);
      setMessage(res.data.message);
    } else {
      console.log("It was not success!");
      setSuccess(false);
      setMessage(res.data.message);
    }
    toggleToast();
  }

  const handleCancel = () => {
    navigate('/home')
  }

  return (
    <div className="d-flex flex-column">
      <div>
        <h3 className="my-2 mx-3">Create a Note</h3>
      </div>
      <div>
        <form>
          <div className="mb-3 mx-3">
            <label htmlFor="heading" className="form-label"><strong>Heading</strong></label>
            <input
            type="text"
            className="form-control"
            onChange={(e) => setHeading(e.target.value)}
            value={heading}
            />
          </div>
          <div className="mb-3 mx-3">
            <label htmlFor="content" className="form-label"><strong>Content</strong></label>
            <textarea
            type="text"
            className="form-control"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            />
          </div>
          <div className="d-flex justify-content-start">
            <Button variant="primary" className="ms-3" onClick={handleSubmit}>Submit</Button>
            <Button variant="success" className="ms-3" onClick={handleCancel}>Go Back to Home Page</Button>
          </div>
        </form>
      </div>
      <ToastFile show={showToast} onClose={toggleToast} success={success} message={message} />
    </div>
  )
}
