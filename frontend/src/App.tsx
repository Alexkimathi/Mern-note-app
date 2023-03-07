import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView";
import NotesPageLogoutView from "./components/NotesPageLogoutView";
import SignupModal from "./components/SignupModal";
import { User } from "./models/user";
import * as NotesApi from "./Network/notes__api";
import styles from "./styles/notesPage.module.css";


function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <Container className={styles.notesPage}>
        <>
          {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLogoutView />}
        </>
        {showSignUpModal && (
          <SignupModal
            onDismiss={() => setShowSignUpModal(false)}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user);
              setShowSignUpModal(false);
            }}
          />
        )}
        {showLoginModal && (
          <LoginModal
            onDismiss={() => setShowLoginModal(false)}
            onLoginSuccessfull={(user) => {
              setLoggedInUser(user);
              setShowLoginModal(false);
            }}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
