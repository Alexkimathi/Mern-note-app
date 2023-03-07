
import { User } from './../models/user';
import * as NotesApi from "../Network/notes__api";
import { Button, Navbar } from 'react-bootstrap';

interface NavBarLoggedInViewProps {
    user:User,
    onLogoutSuccessful:() => void,
}



const NavbarLoggedInView = ({user,onLogoutSuccessful}: NavBarLoggedInViewProps) => {

    async function logout() {

        try {
            await NotesApi.logout();
            onLogoutSuccessful()
            
        } catch (error) {
            console.error(error)
            alert(error)
            
        }
        
    }


    return ( 
        <>
        <Navbar.Text className='me-2'>
            Signed in as: {user.username}
        </Navbar.Text>
        <Button onClick={logout}>Log Out</Button>
        
        </>
     );
}
 
export default NavbarLoggedInView;