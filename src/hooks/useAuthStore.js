import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from '../store';

export const useAuthStore = () => { // usado en LoginPage.jsx y AppRouter.jsx

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    // const startLogin = async({ email, password }) => {
    const startLogin = async({ correo, password }) => { // usado en LoginPage.jsx

        dispatch( onChecking() );

        try {

            // es correo ya que asi esta en postman y asi se guarda en mongo
            // const { data } = await calendarApi.post('/auth',{ email, password });
            const { data } = await calendarApi.post('/auth',{ correo, password });
            // console.log( { data } );

            // guardar el token traido desde el backend y que vino en la data
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            // es nombre porque asi viene desde mi backend
            // dispatch( onLogin({ name: data.name, uid: data.uid }) );
            dispatch( onLogin({ name: data.nombre, uid: data.uid }) );

            
        } catch (error) {

            dispatch( onLogout('Credenciales incorrectas') );

            setTimeout(() => { // borrar el mensaje de error despues de 10 milesimas de segundo

                dispatch( clearErrorMessage() );

            }, 10);

        }

    }

    // const startRegister = async({ email, password, name }) => {
    const startRegister = async({ correo, password, nombre }) => { // usado en LoginPage.jsx

        dispatch( onChecking() );

        try {

            // es correo ya que asi esta en postman y asi se guarda en mongo
            // const { data } = await calendarApi.post('/auth/new',{ email, password, name });
            const { data } = await calendarApi.post('/auth/new',{ correo, password, nombre });

            // guardar el token traido desde el backend y que vino en la data
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            // es nombre porque asi viene desde mi backend
            // dispatch( onLogin({ name: data.name, uid: data.uid }) );
            dispatch( onLogin({ name: data.nombre, uid: data.uid }) ); // redux chrome

            
        } catch (error) {

            // console.log( { error } );

            dispatch( onLogout( error.response.data?.msg || '--' ) );

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
            const { data } = await calendarApi.get('auth/renew');

            // guardar el token traido desde el backend y que vino en la data
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            // es nombre porque asi viene desde mi backend
            dispatch( onLogin({ name: data.name, uid: data.uid }) ); // redux chrome

        } catch (error) {

            // console.log( error );

            localStorage.clear(); // por seguridad limpiar el localstorage
            dispatch( onLogout() ); // si NO hay token o lo que sea salio mal, cerrar sesion

        }
    }

    const startLogout = () => {

        localStorage.clear();
        dispatch( onLogoutCalendar() );
        dispatch( onLogout() );

    }

    return {
        //* Propiedades
        errorMessage,
        status, 
        user, 

        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }

}

// despachar acciones respectivas desde authSlice.js a useAuthStore.js
// https://www.udemy.com/course/react-cero-experto/learn/lecture/32534006?start=90#questions

// creacion de un usuario nuevo desde el frontend hacia el backend:
// https://www.udemy.com/course/react-cero-experto/learn/lecture/20420505#questions

// mantener el estado de la autenticacion: https://www.udemy.com/course/react-cero-experto/learn/lecture/20421025?start=15#questions

