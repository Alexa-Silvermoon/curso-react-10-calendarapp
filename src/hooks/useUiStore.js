import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store';

export const useUiStore = () => { // usado en CalendarModal.jsx, CalendarPage.jsx, FabAddNew.jsx

    const dispatch = useDispatch();

    const { 

        isDateModalOpen

    } = useSelector( state => state.ui );

    const openDateModal = () => { // usado en CalendarPage.jsx

        dispatch( onOpenDateModal() )

    }

    const closeDateModal = () => { // usado CalendarModal.jsx

        dispatch( onCloseDateModal() )

    }

    const toggleDateModal = () => {

        (isDateModalOpen)
            ? openDateModal()
            : closeDateModal();

    }

    return {

        //* Propiedades
        isDateModalOpen,

        //* Métodos
        closeDateModal,
        openDateModal,
        toggleDateModal,

    }

}

// mostrar y ocultar modal: https://www.udemy.com/course/react-cero-experto/learn/lecture/20349211?start=450#questions
