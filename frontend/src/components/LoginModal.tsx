import { User } from "../models/user";
import { useForm } from 'react-hook-form';
import { LoginCredentials } from "../Network/notes__api";
import * as NotesApi from "../Network/notes__api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import stylesutils from "../styles/utils.module.css";
import { useState } from 'react';
import { UnauthorizedError } from './errors/htpp_errors';
interface LoginModalProps{
    onDismiss:() => void,
    onLoginSuccessfull: (user:User) => void,
}


const LoginModal =  ({onDismiss,onLoginSuccessfull} : LoginModalProps) => {


    const {register, handleSubmit, formState:{errors,isSubmitting}} = useForm<LoginCredentials>();

    const [errorText, setErrorText] = useState <String|null>(null)
    async function onSubmit(credentials: LoginCredentials) {
        try {
            const user = await NotesApi.login(credentials)
            onLoginSuccessfull(user)
            
        } catch (error) {
            if (error instanceof UnauthorizedError){
                setErrorText(error.message)
            }else{
                alert(error);
            }
           
            console.error(error)
            
        }
        

    }
    return ( 

        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Login
                </Modal.Title>

            </Modal.Header>

            <Modal.Body>
                {errorText && 
                <Alert variant="danger">
                    {errorText}
                </Alert>
                
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField 
                    name="username"
                    label="UserName"
                    type ="text"
                    placeholder = "UserName"
                    register={register}
                    registerOptions={{required:"Required"}}
                    errors={errors.username}
                    />


                <TextInputField 
                    name="password"
                    label="Password"
                    type ="password"
                    placeholder = "Password"
                    register={register}
                    registerOptions={{required:"Required"}}
                    errors={errors.password}
                    />

                    <Button type='submit' disabled={isSubmitting} className={stylesutils.width100}>
                        log-In
                    </Button>


                </Form>
            </Modal.Body>
        </Modal>

     );
}
 
export default LoginModal;