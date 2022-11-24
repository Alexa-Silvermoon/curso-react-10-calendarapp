import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';


export const useCalendarStore = () => {// usadon en CalendarPage.jsx, FabAddNew.jsx
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar ); // apunta a CalendarSlice.js
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {

        dispatch( onSetActiveEvent( calendarEvent ) )

    }

    const startSavingEvent = async( calendarEvent ) => { // usado en CalendarModal.jsx
        
        try {

            // SI viene un id significa que se actualiza el evento
            if( calendarEvent.id ) {

                // Actualizando
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
                dispatch( onUpdateEvent({ ...calendarEvent, user }) ); // de esta forma se rompe la referencia y se envia un nuevo objeto
                return;

            } 

            // si NO viene un id, significa que es un evento nuevo
            // Creando
            const { data } = await calendarApi.post('/events', calendarEvent );
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );

        } catch (error) {

            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');

        }
        
    }

    const startDeletingEvent = async() => { // usado en FabDelte.jsx

        // Todo: Llegar al backend

        try {

            await calendarApi.delete(`/events/${ activeEvent.id }` );
            dispatch( onDeleteEvent() );

        } catch (error) {

            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');

        }

    }

    const startLoadingEvents = async() => {

        try {
            
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.eventos );
            dispatch( onLoadEvents( events ) );

        } catch (error) {

          console.log('Error cargando eventos');
          console.log(error)

        }

    }

    return {

        //* Propiedades
        activeEvent,
        events,

        // desaparece el boton de borrar mientras se esta creando un nuevo evento
        // hasEventSelected: !!activeEvent,
        // hasEventSelected: !!activeEvent, // si es null regresa false, si tiene un objeto regresa true
        hasEventSelected: !!activeEvent,
        // hasEventSelected: !!activeEvent?.id, // NO FUNCIONA quitan el boton de la basura cuando no hay notas activas seleccionadas

        //* Métodos
        setActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent,

    }
}

// CalendarSlice.js y useCalendarSlice: https://www.udemy.com/course/react-cero-experto/learn/lecture/32499088?start=45#questions
// cargar un evento en un modal: https://www.udemy.com/course/react-cero-experto/learn/lecture/32499164?start=240#questions
// añadir un nuevo evento: https://www.udemy.com/course/react-cero-experto/learn/lecture/20360111#questions
// editar el evento activo: https://www.udemy.com/course/react-cero-experto/learn/lecture/20361175#questions
// eliminar evento: https://www.udemy.com/course/react-cero-experto/learn/lecture/20361185#questions
// actualizar el evento https://www.udemy.com/course/react-cero-experto/learn/lecture/20457477#questions
// eliminar evento propio pero no ajeno: https://www.udemy.com/course/react-cero-experto/learn/lecture/20457479#questions
