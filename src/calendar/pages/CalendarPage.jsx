import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // apariencia del calendario

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete} from '../';

import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';

export const CalendarPage = () => { // usado en AppRouter.jsx

  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  // de no existir una ultima vista guardada, poner por defecto la vista de week
  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week' );

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

    const style = { // estilo del evento

      // si usuario es quien dice ser, el color del evento sera azul, pero los otros usuarios lo veran gris
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'

    }

    return {

      style

    }

  }

  const onDoubleClick = ( event ) => {

    // console.log({ doubleClick: event });
    openDateModal();

  }

  const onSelect = ( event ) => {

    // console.log({ click: event });
    setActiveEvent( event );

  }

  const onViewChanged = ( event ) => {

    localStorage.setItem('lastView', event ); // guarda la ultima vista que se tuvo, toma el event y lo guarda como lastView
    setLastView( event ) // cargar el ultimo view guardado

  }

  useEffect(() => {

    startLoadingEvents()

  }, [])

  return (

    <>
      <Navbar />

      <Calendar
        culture='es' /* poner en español mes año */
        localizer={ localizer }
        events={ events }
        defaultView={ lastView } /* cada vez que refresco en navegador, se abre en la ultima vista seleccionada, sino por defecto queda en week */
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesES() } /* poner en español el resto de la app */
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent // es el cuadrito de cada dia donde aparecen los detalles si hay un evento
        }}

        // eventos en el cuadrito de azul del dia señeccionado con el evento 
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal /> {/* cuadro de nuevo evento */}
      
      <FabAddNew /> {/* boton azul para agregar nuevo evento */}
      <FabDelete />

    </>

  )

}

// https://www.npmjs.com/package/react-big-calendar
// React Big Calendar https://www.udemy.com/course/react-cero-experto/learn/lecture/20343667?start=15#questions
// Configuraciones adicionales al calendario https://www.udemy.com/course/react-cero-experto/learn/lecture/20344297#questions
// personalizar el cuadro del evento https://www.udemy.com/course/react-cero-experto/learn/lecture/20345291#questions
// escuchar eventos del calendario
// creando un modal sobre el calendario: https://www.udemy.com/course/react-cero-experto/learn/lecture/20345787#questions
// mostrar y ocultar modal: https://www.udemy.com/course/react-cero-experto/learn/lecture/20349211?start=450#questions
// CalendarSlice.js y useCalendarSlice: https://www.udemy.com/course/react-cero-experto/learn/lecture/32499088?start=45#questions
// cargar un evento en un modal: https://www.udemy.com/course/react-cero-experto/learn/lecture/32499164?start=240#questions
// preparando la creacion de un nuevo evento: https://www.udemy.com/course/react-cero-experto/learn/lecture/32499238#questions
// cambiar el color de los eventos segun el usuario: https://www.udemy.com/course/react-cero-experto/learn/lecture/32548610#questions
