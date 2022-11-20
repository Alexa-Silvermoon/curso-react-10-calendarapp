import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';

const loginFormFields = {

    loginEmail:    '',
    loginPassword: '',

}

const registerFormFields = {

    registerName:      '',
    registerEmail:     '',
    registerPassword:  '',
    registerPassword2: '',

}

export const LoginPage = () => { // usado en AppRouter.jsx

    const { startLogin, errorMessage, startRegister } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );
    const { registerEmail, registerName, registerPassword, registerPassword2, onInputChange:onRegisterInputChange } = useForm( registerFormFields );

    const loginSubmit = ( event ) => {

        event.preventDefault(); // evitar que el navegador se recargue
        // startLogin({ email: loginEmail, password: loginPassword });

        // es correo ya que asi esta en postman y asi se guarda en mongo
        startLogin({ correo: loginEmail, password: loginPassword });

    }

    const registerSubmit = ( event ) => {

        event.preventDefault();

        if ( registerPassword !== registerPassword2 ) {

            Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
            return;

        }

        // startRegister({ name: registerName, email: registerEmail, password: registerPassword });
        // Estos nombres van español porque asi estan en mongo
        startRegister({ nombre: registerName, correo: registerEmail, password: registerPassword });

    }

    useEffect(() => {

        // error en la autenticacion del login
        if ( errorMessage !== undefined ) {

            // mensaje , dependencia, icono
            Swal.fire('Error en la autenticación', errorMessage, 'error');

        }    

    }, [errorMessage])

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="registerPassword"
                                value={ registerPassword }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="registerPassword2"
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

// useForm - login y registro: https://www.udemy.com/course/react-cero-experto/learn/lecture/32533516#questions
// mostrar error en la autenticacion: https://www.udemy.com/course/react-cero-experto/learn/lecture/32534060?start=15#questions

// creacion de un usuario nuevo desde el frontend hacia el backend:
// https://www.udemy.com/course/react-cero-experto/learn/lecture/20420505#questions

// mantener el estado de la autenticacion: https://www.udemy.com/course/react-cero-experto/learn/lecture/20421025?start=15#questions

