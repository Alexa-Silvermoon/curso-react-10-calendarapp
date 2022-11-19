import { useAuthStore } from "../../hooks/useAuthStore"

export const Navbar = () => { // usado en CalendarPage.jsx

  const { startLogout, usuario } = useAuthStore();

  return (

    <div className="navbar navbar-dark bg-dark mb-4 px-4">

        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp; {/* separacion entre el loguito de calendario y el texto Alexander */}
            { usuario.nombre }
        </span>

        {/* boton de salir: */}
        <button className="btn btn-outline-danger"
          onClick={ startLogout }
        >
            <i className="fas fa-sign-out-alt"></i>
            &nbsp;
            <span>Salir</span>
        </button>

    </div>
  )
}

// loguito del calendar usado en index.html es el cdnjs
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
// https://cdnjs.com/libraries/font-awesome

// LoginPage y Navbar
// https://www.udemy.com/course/react-cero-experto/learn/lecture/20343347#questions
