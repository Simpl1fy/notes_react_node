// import React from 'react'
import { useState } from "react";
import Form from "./Form";
import ShowNotes from "./ShowNotes";

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = () => {
    setFormSubmitted(prevState => !prevState);
  }

  return (
    <>
        <Form handleChange={handleChange} />
        {console.log(formSubmitted)}
        <ShowNotes formSubmitted={formSubmitted} />
    </>
  )
}
