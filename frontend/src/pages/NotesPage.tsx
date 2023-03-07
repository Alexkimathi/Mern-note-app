import NotesPageLogoutView from "../components/NotesPageLogoutView";

import { Container } from 'react-bootstrap';
import { User } from "../models/user";
import NotesPageLoggedInView from './../components/NotesPageLoggedInView';
import styles from "../styles/notesPage.module.css";


interface NotePageProps {
    loggedInUser: User | null,
}

const NotesPage = ({loggedInUser}: NotePageProps) => {
    
    return ( 
           <Container className={styles.notesPage}>
        <>
          {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLogoutView />}
        </>
    
      </Container>

     );
}
 
export default NotesPage;