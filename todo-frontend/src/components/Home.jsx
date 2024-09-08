// import React from 'react'
import { useState } from "react";
// import Form from "./Form";
import ShowNotes from "./ShowNotes";
import ToastFile from "./ToastFile";
import NoteModal from "./NoteModal";

export default function Home() {
  // state for toasts
  const [showToast, setShowToast] = useState(false);

  // state for opening a modal for note writing
  const [newModal, setnewModal] = useState(false);

  // formSubmitted state is for re-rendering of the notes after user has submitted or deleted a note
  const [formSubmitted, setFormSubmitted] = useState(false);

  // states success and message are for toasts
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(false);

  const handleChange = () => {
    // changing the state from true to false and vice versa everytime the function is called, resulting in re-render of the ShowNotes component
    setFormSubmitted(prevState => !prevState);
  }

  // functions for toggling modals
  const openModal = (setState) => {
    setState(true);
  }
  const closeModal = (setState) => {
    setState(false);
  }

  const toggleToast = () => setShowToast(!showToast); // function to render toast

  return (
    <>
        <ToastFile show={showToast} onClose={toggleToast} success={success} message={message} />
        {/* <Form handleChange={handleChange} setSuccess={setSuccess} toggleToast={toggleToast} setMessage={setMessage} /> */}
        <div className="d-flex align-items-center justify-content-center my-7"><button className="btn btn-primary m-3" onClick={() => openModal(setnewModal)}>Create a New Note</button></div>
        <ShowNotes formSubmitted={formSubmitted} setSuccess={setSuccess} setMessage={setMessage} toggleToast={toggleToast} />
        <NoteModal isOpen={newModal} closeModal={() => closeModal(setnewModal)} handleChange={handleChange} setSuccess={setSuccess} setMessage={setMessage} toggleToast={toggleToast} />
    </>
  )
}
