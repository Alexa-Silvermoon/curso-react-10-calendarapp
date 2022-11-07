import { createSlice } from '@reduxjs/toolkit';
import { addHours  } from 'date-fns'; // funcionalidad del calendario

const tempEvent = {

    _id: new Date().getTime(),
    title: 'cumpleaños del jefe',
    notes: 'hay que comprar el pastel',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
  
      _id: '123',
      name: 'Alexander'
    }

};

export const calendarSlice = createSlice({ // usado en store.js

    name: 'calendar',

    initialState: {

        events: [ // usado en useCalendarStore.js y CalendarPage.jsx

            tempEvent
        ],
        activeEvent: null // usado en useCalendarStore.js

    },

    reducers: {

        onSetActiveEvent: ( state, { payload } ) => { // usado en useCalendarStore.js

            state.activeEvent = payload

        },
        onAddNewEvent: ( state, { payload } ) => { // usado en useCalendarStore.js

            state.events.push( payload );
            state.activeEvent = null // cierra el evento

        },
        onUpdateEvent: ( state, { payload } ) => { // usado en useCalendarStore.js

            state.events = state.events.map( event => { // si el evento existe, lo busca por id y hace lo siguiente

                if ( event._id === payload._id ){

                    return payload;

                }

                return event;

            });
        },
        onDeleteEvent: ( state ) => { // usado en useCalendarStore.js

            if ( state.activeEvent ){ // solo se puede borrar un evento que este activo, es decir seleccionado con el mouse

                state.events = state.events.filter( event => event._id !== state.activeEvent._id ); // borrar evento que coincida con id
                state.activeEvent = null; // para ya no tener ningun evento activo

            }

        }
    }

});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;

// CalendarSlice.js y useCalendarSlice: https://www.udemy.com/course/react-cero-experto/learn/lecture/32499088?start=45#questions
// cargar un evento en un modal: https://www.udemy.com/course/react-cero-experto/learn/lecture/32499164?start=240#questions
// editar el evento activo: https://www.udemy.com/course/react-cero-experto/learn/lecture/20361175#questions
// eliminar evento: https://www.udemy.com/course/react-cero-experto/learn/lecture/20361185#questions
