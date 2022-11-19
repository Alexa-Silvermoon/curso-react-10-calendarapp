import { Navigate, Route, Routes } from "react-router-dom"
import { useEffect } from "react";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { getEnvVariables } from "../helpers";
import { useAuthStore } from "../hooks";

export const AppRouter = () => { // usado en CalendarApp.jsx

    const { status, checkAuthToken } = useAuthStore();
    // const authStatus = 'not-authenticated'; // 'authenticated', 'not-authenticated'
    // console.log( getEnvVariables() );

    useEffect(() => {

        checkAuthToken(); // verificar token antes de iniciar sesion

    }, [] )
    

    if ( status === 'checking' ){

        return(

            <h3>Cargando...</h3>

        )
    }
    
    return (
    
        <Routes>
            { 
                // ( authStatus === 'not-authenticated' ) // ternario, NO esta autenticado?
                ( status === 'not-authenticated' ) // ternario, NO esta autenticado?
                
                ?(
                    <>

                        <Route path="/auth/*" element={ <LoginPage/> } /> {/* cualquier ruta que entre al / va a mostrar el LoginPage */}
                        <Route path="/*" element={ <Navigate to="/auth/login" /> } /> {/*  si usuario esta en cualquer otra ruta no existente, dirigirlo al login  */}

                    </>
                )
                : // esto extraño se hace para proteger la visibilidad de las rutas
                (

                    <>

                        <Route path="/" element={ <CalendarPage/> } /> {/* cualquier ruta que no sea /auth/* va a mostrar el CalendarPage */}
                        <Route path="/*" element={ <Navigate to="/" /> } /> {/*  si usuario autenticado esta en cualquier otra ruta no existente, dirigirlo al / */}
                    
                    </>

                )
            }

        </Routes>
    
    )
}

// Rutas de la aplicacion https://www.udemy.com/course/react-cero-experto/learn/lecture/32496622#questions
// mantener el estado de la autenticacion: https://www.udemy.com/course/react-cero-experto/learn/lecture/20421025?start=15#questions
