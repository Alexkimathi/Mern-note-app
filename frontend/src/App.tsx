import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import styles from "./styles/notesPage.module.css";
import style from "./styles/utils.module.css";
import * as NotesApi from "./Network/notes__api";

import Note from "./components/Note";
import { Note as NoteModel } from "./models/node";
import AddNotes from "./components/AddEditNotes";
import {FaPlus} from "react-icons/fa"
import AddEditNotes from "./components/AddEditNotes";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null)

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();

        setNotes(notes);
      } catch (error) {
        console.error(error);
       setShowNotesLoadingError(true);
      }finally{
        setNotesLoading(false)
      }
    }
    loadNotes();
  }, []);


  async function deleteNote(note:NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(exsistingNote => exsistingNote._id !== note._id));
      
    } catch (error) {
      console.error(error);
      alert(error);
      
    }
    
  }

  const notesGrid =
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} 
            className={styles.note}
            onNoteClicked = {setNoteToEdit}
            onDeleteNote = {deleteNote}
             />
          </Col>
        ))}
      </Row>


  return (
    <Container className={styles.notesPage}>
      <Button onClick={() => setShowAddNoteDialog(true)} 
      className={`mb-4 ${style.blockedCenter} ${style.flexCenter}`}>
        <FaPlus />
        Add New Note
      </Button>
    
    {notesLoading && <Spinner animation="border" variant="primary"/>}
    {showNotesLoadingError && <p>Something went wrong. please refresh the page.</p>}
    {!notesLoading && !showNotesLoadingError && 
    <>
    {
      notes.length > 0 ? notesGrid :<p>You dont have any notes yet!</p>
    }
    
    </>
    }

      {showAddNoteDialog && (
        <AddNotes
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
      {
        noteToEdit  &&
        <AddEditNotes 
        noteToEdit={noteToEdit}
        onDismiss = {() => setNoteToEdit(null)}
        onNoteSaved = {(updatedNote)=>{
          setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));
          setNoteToEdit(null)
        }}
         />
      }
    </Container>
  );
}

export default App;
