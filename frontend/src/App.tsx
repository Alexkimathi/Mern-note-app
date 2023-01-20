import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./styles/notesPage.module.css";
import style from "./styles/utils.module.css";
import * as NotesApi from "./Network/notes__api";

import Note from "./components/Note";
import { Note as NoteModel } from "./models/node";
import AddNotes from "./components/AddNotes";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

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

  return (
    <Container>
      <Button onClick={() => setShowAddNoteDialog(true)} className={`mb-4 ${style.blockedCenter}`}>
        Add New Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.note} />
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
    </Container>
  );
}

export default App;
