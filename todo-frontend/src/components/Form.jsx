// import { useState } from 'react'

function Form() {
  return (
    <>
      <div className="form-container mx-3 mt-3">
        <form className="px-auto border border-2 border-dark p-3 rounded-4">
          <div className="mb-3">
            <label htmlFor="heading" className="form-label">
              Heading
            </label>
            <input
              type="text"
              className="form-control"
              id="headingInput"
              placeholder="Enter the heading of your task"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="explanation" className="form-label">
              Explanation
            </label>
            <textarea name="explain" id="explanationBox" className="form-control" rows="5"></textarea>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary d-block">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
