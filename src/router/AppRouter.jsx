import { Navigate, Route, Routes } from "react-router-dom"
import { CalendarPage } from "../calendar";
import { LoginPage } from "../auth";

export const AppRouter = () => { // usado en CalendarApp.jsx
    
    // const authStatus = 'not-authenticated';
    const authStatus = 'authenticated';
    
    return (
    
        <Routes>
            { 
                ( authStatus === 'not-authenticated' ) // ternario, NO esta autenticado?
                ? <Route path="/auth/*" element={ <LoginPage/> } /> /* cualquier ruta que entre al / va a mostrar el LoginPage  */
                : <Route path="/*" element={ <CalendarPage/> } /> /* cualquier ruta que no sea /auth/* va a mostrar el CalendarPage  */
            }
            
            <Route path="/*" element={ <Navigate to="/auth/login" /> } /> {/*  si usuario esta en cualquer otra ruta no existente, dirigirlo al login  */}

        </Routes>
    
    )
}

// Rutas de la aplicacion https://www.udemy.com/course/react-cero-experto/learn/lecture/32496622#questions
