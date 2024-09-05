import { useState, useEffect } from "react"
import axios from "axios";

export default function ShowNotes() {
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem('token');
  const config = {
      headers: {Authorization: `Bearer ${token}`}
  }
  useEffect( () => {
    const showNotes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/note/show', config);
        if (res.length > 0) {
          setNotes(res);
        }
      } catch(err) {
        console.error(err);
      }
    }
    showNotes();
  }, [])   
  return (
    <div>
      <h3>Your Notes</h3>
      {notes && notes.map((note, index) => (
        <div key={index}>
          <div className="heading">{note.heading}</div>
          <div className="content">{note.content}</div>
        </div>
      ))}
    </div>
  )
}
