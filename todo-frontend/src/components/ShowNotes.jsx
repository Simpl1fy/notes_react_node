import { useState, useEffect } from "react"
import { Button } from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import NoteViewEditModal from "./NoteViewEditModal";
import { useAuth } from "./useAuth";
import ConfirmationModal from "./ConfirmationModal";
import api from "../config/axiosConfig";
import '../scss/showNote.css';
import { useNavigate } from "react-router-dom";


export default function ShowNotes({ formSubmitted, setSuccess, setMessage, toggleToast, handleChange }) {

  const navigate = useNavigate();
  
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

  // state for confirmation modal opening
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);

  const { isLoggedIn, isMobile } = useAuth();

  // functions for toggling modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openConfirmModal = () => setConfirmModalIsOpen(true);
  const closeConfirmModal = () => setConfirmModalIsOpen(false);


  useEffect(() => {
    const showNotes = async () => {
      console.log("Fetching notes");
      if(!token) {
        setNoNotes('No notes found');
        return;
      }
      try {
        const res = await api.get('/note/show', {
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
      const res = await api.post(`/note/delete/${id}`);
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
    setHeading(heading);
    setContent(content);
    if(isMobile){
      navigate('/view-note', { state: {heading, content} });
    } else {
      setDisabled(true);
      openModal();
    }
  }

  const handleEdit = (heading, content, id) => {
    setDisabled(false);
    setHeading(heading);
    setContent(content);
    setNoteId(id);
    openModal();
  }

  const handleConfirmation = (id) => {
    setNoteId(id);
    openConfirmModal();
  }

  return (
    <div style={{marginLeft: '0.5rem'}}>
      <h3 className="m-2">Your Notes</h3>
      <div>
        {isLoggedIn &&  notes.length > 0 ?
        <>
          {notes.map((note, index) => (
            <div className="d-flex justify-content-between align-items-center border border-secondary-subtle rounded-2 m-2" key={index}>
              <div className="m-2">
                {note.heading}
              </div>
              <div className="d-flex justify-content-center">
                 <Button variant="primary" className="m-2 c-mobile-button" onClick={() => handleView(note.heading, note.content)} ><RemoveRedEyeIcon /></Button>
                 <Button variant="primary" className="m-2 c-mobile-button" onClick={() => handleEdit(note.heading, note.content, note.notes_id)}><ModeEditIcon /></Button>
                 <Button variant="danger" onClick={() => handleConfirmation(note.notes_id)} className="m-2 c-mobile-button"><DeleteIcon /></Button>
               </div>
            </div>
          ))}
        </> : <>
          <h6 className="ms-2">{noNotes}</h6>
        </>
        }
      </div>
      <NoteViewEditModal isOpen={isOpen} closeModal={closeModal} isDisabled={disabled} heading={heading} content={content} noteId={noteId} handleChange={handleChange} setSuccess={setSuccess} setMessage={setMessage} toggleToast={toggleToast} />
      <ConfirmationModal isOpen={confirmModalIsOpen} closeModal={closeConfirmModal} id={noteId} deleteFunction={deleteNote} />
    </div>
  )
}
