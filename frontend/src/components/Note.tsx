import React from 'react'
import { Card } from 'react-bootstrap';
import styles from "../styles/note.module.css";
import style from "../styles/utils.module.css";
import { Note as NoteModel } from './../models/node';
import { formatDate } from './../utils/formatDate';
import {MdDelete} from "react-icons/md";

interface NoteProps {
    note:NoteModel,
    className?: string,
    onDeleteNote:(note: NoteModel) => void,

}

const Note = ({note, className, onDeleteNote}: NoteProps) => {
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
            <Card.Title className={style.flexCenter}>
                {title}
                <MdDelete  className='text-muted ms-auto' 
                onClick={(e) =>{
                    onDeleteNote(note);
                    e.stopPropagation();


                }}/>
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