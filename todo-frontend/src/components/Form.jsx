import { useState } from 'react'
import axios from 'axios';
import { SuccessAlert, FailureAlert } from './Alertfile';

function Form() {
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');


  const token = localStorage.getItem('token')

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      <SuccessAlert />
    } else {
      console.log("It was not success!");
      <FailureAlert />
    }
  }

  return (
    <>
      <div className="form-container px-3 py-3 bg-primary vh-100">
        <form className="px-auto border border-2 border-dark p-3 rounded-4 bg-light" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="heading" className="form-label">
              Heading
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
              Explanation
            </label>
            <textarea
              name="explain"
              id="explanationBox"
              className="form-control"
              rows="5"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-success d-block">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
