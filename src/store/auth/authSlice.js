import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({ // usado en store.js

    name: 'auth',

    initialState: {
        status: 'checking', // 'authenticated','not-authenticated',

        user: {},
        errorMessage: undefined,

    },
    reducers: {

        onChecking: ( state ) => { // usado en useAuthStore.js

            state.status = 'checking';
            state.user   = {};
            state.errorMessage = undefined;

        },
        onLogin: ( state, { payload } ) => { // usado en useAuthStore.js

            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;

        },
        onLogout: ( state, { payload } ) => { // usado en useAuthStore.js

            state.status = 'not-authenticated';
            state.user   = {};
            state.errorMessage = payload;

        },
        clearErrorMessage: ( state ) => { // usado en useAuthStore.js

            state.errorMessage = undefined;

        }

    }

});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;

// creacion authSlice.js https://www.udemy.com/course/react-cero-experto/learn/lecture/32533436#questions

// despachar acciones respectivas desde authSlice.js a useAuthStore.js
// https://www.udemy.com/course/react-cero-experto/learn/lecture/32534006?start=90#questions

// creacion de un usuario nuevo desde el frontend hacia el backend:
// https://www.udemy.com/course/react-cero-experto/learn/lecture/20420505#questions
