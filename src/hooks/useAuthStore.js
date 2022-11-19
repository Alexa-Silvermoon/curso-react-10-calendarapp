import { useDispatch, useSelector } from "react-redux"
import calendarAPI from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => { // usado en LoginPage.jsx y AppRouter.jsx

    // const { status, user, errorMessage } = useSelector( state => state.auth );
    const { status, usuario, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async( { correo, password } ) => { // usado en LoginPage.jsx

        console.log( { correo, password } );

        dispatch( onChecking() );

        try {

            // es correo ya que asi esta en postman y asi se guarda en mongo
            // const resp = await calendarAPI.post( '/auth', { correo, password } );
            // console.log( { resp } );

            const { data } = await calendarAPI.post( '/auth', { correo, password } );
            console.log( { data } );

            // guardar el token traido desde el backend y que vino en la data
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            // es nombre porque asi viene desde mi backend
            dispatch( onLogin( { nombre: data.nombre, uid: data.uid } ) ); // redux chrome

        } catch (error) {

            console.log(  { error } );
            dispatch( onLogout( 'usuario o contraseña incorrectos' ) );

            setTimeout(() => { // borrar el mensaje de error despues de 10 milesimas de segundo

                dispatch( clearErrorMessage() );

            }, 10);
            
        }

    }

    // startRegister
    const startRegister = async( { nombre, correo, password, password2 } ) => { // usado en LoginPage.jsx

        console.log( { nombre, correo, password, password2} );

        dispatch( onChecking() );
        
        try {

            const { data } = await calendarAPI.post( '/auth/new', { nombre, correo, password } );
            console.log( { data } );

            // guardar el token traido desde el backend y que vino en la data
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            // es nombre porque asi viene desde mi backend
            dispatch( onLogin( { nombre: data.nombre, uid: data.uid } ) ); // redux chrome
            
        } catch (error) {

            console.log( { error } );
            // dispatch( onLogout( 'usuario o contraseña incorrectos' ) );
            dispatch( onLogout( error.response.data?.msg || 'usuario o contraseña incorrectos' ) );

            setTimeout(() => { // borrar el mensaje de error despues de 10 milesimas de segundo

                dispatch( clearErrorMessage() );

            }, 10);

        }

    }

    const checkAuthToken = async() => { // usado en AppRouter.jsx

        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() ); // si NO hay token, cerrar sesion

        try {

            // ruta en postman localhost:4000/api/auth/renew
            const { data } = await calendarAPI.get('auth/renew');
            console.log( { data } );

            // guardar el token traido desde el backend y que vino en la data
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            // es nombre porque asi viene desde mi backend
            dispatch( onLogin( { nombre: data.nombre, uid: data.uid } ) ); // redux chrome

        } catch (error) {

            console.log( error );

            localStorage.clear(); // por seguridad limpiar el localstorage
            dispatch( onLogout() ); // si NO hay token o lo que sea salio mal, cerrar sesion

        }

    }

    const startLogout = () => {

        localStorage.clear();
        dispatch( onLogout() );

    }

    return{

        // propiedades
        status,
        // user,
        usuario,
        errorMessage,

        // metodos
        checkAuthToken,
        startLogin,
        startRegister,
        startLogout

    }
}

// despachar acciones respectivas desde authSlice.js a useAuthStore.js
// https://www.udemy.com/course/react-cero-experto/learn/lecture/32534006?start=90#questions

// creacion de un usuario nuevo desde el frontend hacia el backend:
// https://www.udemy.com/course/react-cero-experto/learn/lecture/20420505#questions

// mantener el estado de la autenticacion: https://www.udemy.com/course/react-cero-experto/learn/lecture/20421025?start=15#questions
