import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

// boton azul para agregar nuevo evento
export const FabAddNew = () => { // usado en CalendarPage.jsx

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew  = () => {

        setActiveEvent({

            // _id: new Date().getTime(),
            // title: 'Hola',
            // title: '',
            titulo: '',
            // notes: 'reymundo',
            // notes: '',
            notas: '',
            // start: new Date(),
            inicio: new Date(),
            // end: addHours( new Date(), 2 ),
            fin: addHours( new Date(), 2 ),
            bgColor: '#fafafa',
            // user: {
            usuario: {
        
                _id: '123',
                nombre: 'Alexander'
            }
        });

        openDateModal();
    }

    return(

        <button
            className="btn btn-primary fab"
            onClick={ handleClickNew }
        >

            <i className="fas fa-plus"></i> {/* simbolo + */}

        </button>
    )
}

// preparando la creacion de un nuevo evento: https://www.udemy.com/course/react-cero-experto/learn/lecture/32499238#questions
