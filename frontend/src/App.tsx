import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
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

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null)

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();

        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
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
  return (
    <Container>
      <Button onClick={() => setShowAddNoteDialog(true)} 
      className={`mb-4 ${style.blockedCenter} ${style.flexCenter}`}>
        <FaPlus />
        Add New Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
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
