// import React from 'react'
import { useState } from "react";
import Form from "./Form";
import ShowNotes from "./ShowNotes";
import ToastFile from "./ToastFile";

export default function Home() {
  const [showToast, setShowToast] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(false);

  const handleChange = () => {
    setFormSubmitted(prevState => !prevState);
  }

  const toggleToast = () => setShowToast(!showToast);

  return (
    <>
        <ToastFile show={showToast} onClose={toggleToast} success={success} message={message} />
        <Form handleChange={handleChange} setSuccess={setSuccess} toggleToast={toggleToast} setMessage={setMessage} />
        <ShowNotes formSubmitted={formSubmitted} setSuccess={setSuccess} setMessage={setMessage} toggleToast={toggleToast} />
    </>
  )
}
