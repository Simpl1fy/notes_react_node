import { useState, useEffect } from "react"
import axios from "axios";
import { Card } from "react-bootstrap";

export default function ShowNotes() {
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem('token');
  useEffect( () => {
    const showNotes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/note/show', {
          headers: {Authorization: `Bearer ${token}`}
        });
        console.log(res.data);
        if (res.data.length > 0) {
          setNotes(res.data);
        }
      } catch(err) {
        console.error(err);
      }
    }
    showNotes();
  }, [token])   
  return (
    <div style={{marginLeft: '20px'}}>
      <h3>Your Notes</h3>
      <div className="d-flex">
        {notes.length > 0 ?
        <>
          {notes.map((note, index) => (
            <Card style={{width: '18rem', margin:'5px'}} key={index}>
              <Card.Body>
                <Card.Title>{note.heading}</Card.Title>
                <Card.Text>{note.content}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </> : <>
          <h6>No notes found</h6>
        </>
        }
      </div>
    </div>
  )
}
