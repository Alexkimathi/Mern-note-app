import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import SignupModal from "./components/SignupModal";
import { User } from "./models/user";
import * as NotesApi from "./Network/notes__api";
import NotesPage from "./pages/NotesPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from './pages/NotFoundPage';
import styles from "./styles/App.module.css";

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
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModal(true)}
          onSignUpClicked={() => setShowSignUpModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />

        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path="/"
              element={<NotesPage loggedInUser={loggedInUser} />}
            />

            <Route path="/Privacy" element={<PrivacyPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Container>

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
      </div>
    </BrowserRouter>
  );
}

export default App;
