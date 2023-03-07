
import { Container, Nav, Navbar } from 'react-bootstrap';
import { User } from './../models/user';
import NavbarLoggedInView from './NavBarLoggedInView';
import NavBarLogOutView from './NavBarLogOutView';

interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,

}

const NavBar = ({loggedInUser,onSignUpClicked,onLoginClicked,onLogoutSuccessful}:NavBarProps) => {
    return ( 
        <Navbar bg='primary' variant='dark' expand = 'lg' sticky='top'>
            <Container>
                <Navbar.Brand>
                    cool Notes App
                </Navbar.Brand>

                <Navbar.Toggle aria-controls='main-navbar' />
                <Navbar.Collapse id="main-navbar">
                    <Nav className='ms-auto'>
                        {loggedInUser ? 
                        <NavbarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />
                        : <NavBarLogOutView onLoginClicked={onLoginClicked} onSignUpClicked ={onSignUpClicked} />
                        
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
     );
}
 
export default NavBar;