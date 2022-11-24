import { parseISO } from 'date-fns';


export const convertEventsToDateEvents = ( events = []) => { // usado en useCalendarStore.js

    return events.map( event => {

        // parsear fechas que vienen desde el backend
        event.end = parseISO( event.end );
        event.start = parseISO( event.start );

        return event;
    })

}