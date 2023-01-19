import React from 'react'
import { Card } from 'react-bootstrap';
import styles from "../styles/note.module.css";
import { Note as NoteModel } from './../models/node';
import { formatDate } from './../utils/formatDate';

interface NoteProps {
    note:NoteModel,
    className?: string,

}

const Note = ({note, className}: NoteProps) => {
    const {
        title,
        text,
        createdAt,
        updatedAt,

    }=note;

    let createdUpdatedText:String;
    if(updatedAt > createdAt){
        createdUpdatedText = "updated: "+ formatDate(updatedAt)
    }else{
        createdUpdatedText = "created: "+ formatDate(createdAt)
    }

  return (
    <Card className={`${styles.noteCard} ${className}`}>
        <Card.Body className={styles.cardBody}>
            <Card.Title>
                {title}
            </Card.Title>
            <Card.Text className={styles.cardText}>
                {text}
            </Card.Text>
           
        </Card.Body>

        <Card.Footer className='text-muted'>
                {createdUpdatedText}
            </Card.Footer>
    </Card>
  )
}

export default Note