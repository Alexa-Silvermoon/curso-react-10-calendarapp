import { useSelector, useDispatch } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => { // usadon en CalendarPage.jsx, FabAddNew.jsx

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar ); // apunta a CalendarSlice.js

    const setActiveEvent = ( calendarEvent ) => {

        dispatch( onSetActiveEvent( calendarEvent ) );
        
    }

    const startSavingEvent = async( calendarEvent ) => { // usado en CalendarModal.jsx

        // SI viene un id significa que se actualiza el evento
        if ( calendarEvent._id ){

            dispatch( onUpdateEvent( { ...calendarEvent } ) ); // de esta forma se rompe la referencia y se envia un nuevo objeto


        } else { // si NO viene un id, significa que es un evento nuevo

            dispatch( onAddNewEvent( { ...calendarEvent, _id: new Date().getTime() } ) ); // de esta forma se rompe la referencia y se envia un nuevo objeto
        }
    }

    const startDeletingEvent = () => { // usado en FabDelte.jsx

        dispatch( onDeleteEvent() );
    }

    return{

        // propiedades
        activeEvent,
        events,
        // hasEventSelected: !!activeEvent, // si es null regresa false, si tiene un objeto regresa true

        // desaparece el boton de borrar mientras se esta creando un nuevo evento
        hasEventSelected: !!activeEvent?._id, // si es null regresa false, si tiene un objeto regresa true

        // metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent

    }
}

// CalendarSlice.js y useCalendarSlice: https://www.udemy.com/course/react-cero-experto/learn/lecture/32499088?start=45#questions
// cargar un evento en un modal: https://www.udemy.com/course/react-cero-experto/learn/lecture/32499164?start=240#questions
// añadir un nuevo evento: https://www.udemy.com/course/react-cero-experto/learn/lecture/20360111#questions
// editar el evento activo: https://www.udemy.com/course/react-cero-experto/learn/lecture/20361175#questions
// eliminar evento: https://www.udemy.com/course/react-cero-experto/learn/lecture/20361185#questions
