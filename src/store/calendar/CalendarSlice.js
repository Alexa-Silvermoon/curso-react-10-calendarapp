import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';
// const tempEvent =   {
//     _id: new Date().getTime(),
//     title: 'Cumpleaños Alexander',
//     notes: 'Regalarle un super pc gamer',
//     start: new Date(),
//     end: addHours( new Date(), 2 ),
//     bgColor: '#fafafa',
//     user: {
//       _id: '123',
//       name: 'Alexander'
//     }
// };

export const calendarSlice = createSlice({ // usado en store.js

    name: 'calendar',

    initialState: {

        isLoadingEvents: true,

        events: [ // usado en useCalendarStore.js y CalendarPage.jsx
            // tempEvent
        ],
        activeEvent: null // usado en useCalendarStore.js

    },
    reducers: {

        onSetActiveEvent: ( state, { payload }) => { // usado en useCalendarStore.js

            state.activeEvent = payload;

        },
        onAddNewEvent: ( state, { payload }) => { // usado en useCalendarStore.js

            state.events.push( payload );
            state.activeEvent = null; // cierra el evento

        },
        onUpdateEvent: ( state, { payload } ) => { // usado en useCalendarStore.js

            state.events = state.events.map( event => { // si el evento existe, lo busca por id y hace lo siguiente

                if ( event.id === payload.id ) {

                    return payload;

                }

                return event;

            });
        },
        onDeleteEvent: ( state ) => { // usado en useCalendarStore.js

            if ( state.activeEvent ) { // solo se puede borrar un evento que este activo, es decir seleccionado con el mouse

                state.events = state.events.filter( event => event.id !== state.activeEvent.id );
                state.activeEvent = null;

            }
        },
        onLoadEvents: (state, { payload = [] }) => {

            state.isLoadingEvents = false;
            // state.events = payload;

            payload.forEach( event => {

                const exists = state.events.some( dbEvent => dbEvent.id === event.id );
                if ( !exists ) {

                    state.events.push( event )

                }

            })

        },
        onLogoutCalendar: ( state ) => {

            state.isLoadingEvents = true,
            state.events      = []
            state.activeEvent = null

        }

    }

});

// Action creators are generated for each case reducer function
export const {
    onAddNewEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar,
    onSetActiveEvent,
    onUpdateEvent,
} = calendarSlice.actions;

// CalendarSlice.js y useCalendarSlice: https://www.udemy.com/course/react-cero-experto/learn/lecture/32499088?start=45#questions
// cargar un evento en un modal: https://www.udemy.com/course/react-cero-experto/learn/lecture/32499164?start=240#questions
// editar el evento activo: https://www.udemy.com/course/react-cero-experto/learn/lecture/20361175#questions
// eliminar evento: https://www.udemy.com/course/react-cero-experto/learn/lecture/20361185#questions
