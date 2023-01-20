import { Button, Form, FormControl, Modal, ModalFooter } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NoteInput } from "../Network/notes__api";
import { Note } from '../models/node';
import * as NotesApi from "../Network/notes__api"

interface AddEditNoteDailogProps {
    noteToEdit?: Note,
    onDismiss: () => void,
    onNoteSaved: (note:Note)=> void,
}
const AddEditNotes = ({noteToEdit, onDismiss,onNoteSaved}: AddEditNoteDailogProps) => {

    const {register, handleSubmit,formState:{errors, isSubmitting}}= useForm<NoteInput>({
        defaultValues:{
            title:noteToEdit?.title || "",
            text:noteToEdit?.text || "",
        }
    });

    async function onSubmit(input: NoteInput) {
        try {
            let noteResponse:Note;
            if(noteToEdit){
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
            }else{
                noteResponse = await NotesApi.createNote(input)
            }
            onNoteSaved(noteResponse);
            
        } catch (error) {
            console.error(error);
            alert(error);
            
        }
        
    }
    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit ? "Edit Note" : "Add Note"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id = "addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <FormControl type="text" placeholder="Title" {...register("title",{required: "Required"})}
                          isInvalid={!!errors.title}/>

                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>"


                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <FormControl as="textarea" rows={5} placeholder="Text" {...register("text")}
                        />
                        
                        

                    </Form.Group>
                </Form>
            </Modal.Body>
            <ModalFooter>
                <Button type="submit" form="addEditNoteForm" disabled = {isSubmitting}>Submit</Button>
            </ModalFooter>

        </Modal>
     );
}
 
export default AddEditNotes;


