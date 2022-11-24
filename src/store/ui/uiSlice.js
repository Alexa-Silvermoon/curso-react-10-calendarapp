
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({ // usado en store.js

    name: 'ui',

    initialState: {

        isDateModalOpen: false

    },
    reducers: {

        onOpenDateModal: ( state ) => { // usado en useUiStore.js

            state.isDateModalOpen = true;

        },
        onCloseDateModal: ( state ) => { // usado en useUiStore.js

            state.isDateModalOpen = false;

        },

    }

});

// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions; // usado en useUiStore.js

// instalacion y configuracion de reduc: https://www.udemy.com/course/react-cero-experto/learn/lecture/20348599#questions
// mostrar y ocultar modal: https://www.udemy.com/course/react-cero-experto/learn/lecture/20349211?start=450#questions
