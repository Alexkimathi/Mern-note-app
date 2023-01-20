import { Button, Form, FormControl, Modal, ModalFooter } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NoteInput } from "../Network/notes__api";
import { Note } from './../models/node';
import * as NotesApi from "../Network/notes__api"

interface AddNoteDailogProps {
    onDismiss: () => void,
    onNoteSaved: (note:Note)=> void,
}
const AddNotes = ({onDismiss,onNoteSaved}: AddNoteDailogProps) => {

    const {register, handleSubmit,formState:{errors, isSubmitting}}= useForm<NoteInput>();

    async function onSubmit(input: NoteInput) {
        try {
            const noteResponse = await NotesApi.createNote(input);
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
                    Add Note
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id = "addNoteForm" onSubmit={handleSubmit(onSubmit)}>
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
                <Button type="submit" form="addNoteForm" disabled = {isSubmitting}>Submit</Button>
            </ModalFooter>

        </Modal>
     );
}
 
export default AddNotes;


