import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice } from "./";

export const store = configureStore({ // usado en CalendarApp.jsx

    reducer:{

        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer
    },
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware( { // corrige error de fechas no seriealizables

        serializableCheck: false

    })
});

// instalacion y configuracion de reduc: https://www.udemy.com/course/react-cero-experto/learn/lecture/20348599#questions
// Redux serializableCheck: https://www.udemy.com/course/react-cero-experto/learn/lecture/32499772#questions