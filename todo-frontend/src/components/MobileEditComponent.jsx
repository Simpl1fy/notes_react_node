import { Button } from "react-bootstrap";
import { useState, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import JoditEditor from 'jodit-react';
// import { useAuth } from "./useAuth";
import api from "../config/axiosConfig";
import ToastFile from "./ToastFile";

export default function MobileEditComponent() {

  const navigate = useNavigate();
  const location = useLocation();

  const { heading, content, id } = location.state || {}
  
  const [editHeading, setEditHeading] = useState(heading);
  const [editContent, setEditContent] = useState(content);

  // toast
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const toggleToast = () => setShowToast(!showToast);

  // const { localToken } = useAuth();

  const editor = useRef(null);

  const config = useMemo(() => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: 'Start typing...'
  }), []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      heading: editHeading,
      content: editContent
    }
    try {
      const res = await api.put(`/note/update/${id}`, updatedData);
      console.log(res);
      if(res.data.success) {
        console.log("Your note has been updated successfully");
        setSuccess(true);
        setMessage(res.data.message);
      } else {
        console.log("Failed");
        setSuccess(false);
        setMessage(res.data.message);
      }
      toggleToast();
    } catch(err) {
      console.error(err);
    }
  }

  const handleCancel = () => {
    navigate('/home')
  }

  return (
    <div className="d-flex flex-column">
      <div>
        <h3 className="my-2 mx-3">Edit the Note</h3>
      </div>
      <div>
        <form>
          <div className="mb-3 mx-3">
            <label htmlFor="heading" className="form-label"><strong>Heading</strong></label>
            <input
            type="text"
            className="form-control"
            onChange={(e) => setEditHeading(e.target.value)}
            value={editHeading}
            />
          </div>
          <div className="mb-3 mx-3">
            <label htmlFor="content" className="form-label"><strong>Content</strong></label>
            <JoditEditor
                ref={editor}
                value={editContent}
                config={config}
                tabIndex={1}
                onBlur={newContent => setEditContent(newContent)}
                onChange={newContent => setEditContent(newContent)}
            />
          </div>
          <div className="d-flex justify-content-start">
            <Button variant="primary" className="ms-3" onClick={handleUpdate}>Update</Button>
            <Button variant="success" className="ms-3" onClick={handleCancel}>Go Back to Home Page</Button>
          </div>
        </form>
      </div>
      <ToastFile show={showToast} onClose={toggleToast} success={success} message={message} />
    </div>
  )
}
