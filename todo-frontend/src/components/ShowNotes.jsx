import { useState, useEffect } from "react"
import axios from "axios";
import { Box } from "@mui/material";

export default function ShowNotes() {
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem('token');
  useEffect( () => {
    const showNotes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/note/show', {
          headers: {Authorization: `Bearer ${token}`}
        });
        if (res.length > 0) {
          setNotes(res);
        }
      } catch(err) {
        console.error(err);
      }
    }
    showNotes();
  }, [token])   
  return (
    <div>
      <h3>Your Notes</h3>
      {notes && notes.map((note, index) => (
        <div key={index}>
          <Box>
            Hello World
          </Box>
        </div>
      ))}
    </div>
  )
}
