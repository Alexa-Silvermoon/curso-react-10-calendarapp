import { useCalendarStore, useUiStore } from "../../hooks"

// boton rojo para borrar un evento
export const FabDelte = () => { // usado en CalendarPage.jsx

    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const handleDelte = () => {

        startDeletingEvent();

    }

    return(

        <button
            className="btn btn-danger fab-danger"
            onClick={ handleDelte }
            style={{

                display: hasEventSelected ? '' : 'none' // boton esta desaparecido mientras no haya un evento seleccionado con click

            }}
        >

            <i className="fas fa-trash-alt"></i> {/* simbolo de basurita */}

        </button>
    )
}

// preparando la creacion de un nuevo evento: https://www.udemy.com/course/react-cero-experto/learn/lecture/32499238#questions
// eliminar evento: https://www.udemy.com/course/react-cero-experto/learn/lecture/20361185#questions
