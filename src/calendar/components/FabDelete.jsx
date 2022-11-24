import { useCalendarStore, useUiStore } from '../../hooks';

// boton rojo para borrar un evento
export const FabDelete = () => { // usado en CalendarPage.jsx

    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const handleDelete = () => {

        startDeletingEvent();

    }

  return (

    <button
        className="btn btn-danger fab-danger"
        onClick={ handleDelete }
        style={{
            display: hasEventSelected ? '': 'none' // boton esta desaparecido mientras no haya un evento seleccionado con click
        }}
    >
        <i className="fas fa-trash-alt"></i> {/* simbolo de basurita */}
    </button>

  )

}

// preparando la creacion de un nuevo evento: https://www.udemy.com/course/react-cero-experto/learn/lecture/32499238#questions
// eliminar evento: https://www.udemy.com/course/react-cero-experto/learn/lecture/20361185#questions
// eliminar evento propio pero no ajeno: https://www.udemy.com/course/react-cero-experto/learn/lecture/20457479#questions
