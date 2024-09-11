import { useState, useEffect } from "react"
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import NoteViewEditModal from "./NoteViewEditModal";


export default function ShowNotes({ formSubmitted, setSuccess, setMessage, toggleToast, handleChange }) {
  
  // state for storing all the notes of a user
  const [notes, setNotes] = useState([]);

  // state to store the token
  const [token, setToken] = useState();

  // useEffect
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  // state for modal opening
  const [isOpen, setModalIsOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  const [noteId, setNoteId] = useState(0);
  const [noNotes, setNoNotes] = useState('');

  // functions for toggling modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);


  useEffect(() => {
    const showNotes = async () => {
      console.log("Fetching notes");
      if(!token) {
        setNoNotes('No notes found');
        return;
      }
      try {
        const res = await axios.get('http://localhost:5000/note/show', {
          headers: {Authorization: `Bearer ${token}`}
        });
        if (res.data.length > 0) {
          setNotes(res.data);
        }
        console.log(notes);
      } catch(err) {
        console.error(err);
      }
    }
    showNotes();
  }, [token, formSubmitted]);

  const deleteNote = async (id) => {
    console.log("Deleting note with id = " + id);
    try {
      const res = await axios.post(`http://localhost:5000/note/delete/${id}`);
      console.log(res);
      if(res.data.success) {
        console.log("deletion successful");
        setNotes((prevNotes) => {
          const updatedNotes = prevNotes.filter((note) => note.notes_id !== id);
          console.log(`Updated Notes = ${updatedNotes}`);
          return updatedNotes;
        })
        setSuccess(true);
        setMessage(res.data.message);
      } else {
        console.log("failed");
        setSuccess(false);
        setMessage(res.data.message);
      }
      toggleToast();
    } catch(err) {
      console.error(err);
    }
  }

  const handleView = (heading, content) => {
    setDisabled(true);
    setHeading(heading);
    setContent(content);
    openModal();
  }

  const handleEdit = (heading, content, id) => {
    setDisabled(false);
    setHeading(heading);
    setContent(content);
    setNoteId(id);
    openModal();
  }


  return (
    <div style={{marginLeft: '20px'}}>
      <h3>Your Notes</h3>
      <div className="d-flex m-2 flex-wrap">
        {notes.length > 0 ?
        <>
          {notes.map((note, index) => (
            <Card style={{width: '12rem', height:'15rem', marginRight:'5px', marginTop:'5px'}} key={index}>
              <Card.Body>
                <Card.Title>{note.heading}</Card.Title>
                <Card.Text>{note.content}</Card.Text>
              </Card.Body>
              <div className="d-flex">
                <Button variant="primary" style={{width:'3rem'}} className="flex-fill m-2" onClick={() => handleView(note.heading, note.content)} ><RemoveRedEyeIcon /></Button>
                <Button variant="primary" style={{width:'3rem'}} className="flex-fill m-2" onClick={() => handleEdit(note.heading, note.content, note.notes_id)}><ModeEditIcon /></Button>
                <Button variant="danger" style={{width:'3rem'}} onClick={() => deleteNote(note.notes_id)} className="flex-fill m-2"><DeleteIcon /></Button>
              </div>
            </Card>
          ))}
        </> : <>
          <h6>{noNotes}</h6>
        </>
        }
      </div>
      <NoteViewEditModal isOpen={isOpen} closeModal={closeModal} isDisabled={disabled} heading={heading} content={content} noteId={noteId} handleChange={handleChange} setSuccess={setSuccess} setMessage={setMessage} toggleToast={toggleToast} />
    </div>
  )
}
