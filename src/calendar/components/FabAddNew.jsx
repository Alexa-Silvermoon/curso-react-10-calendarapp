import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

// boton azul para agregar nuevo evento
export const FabAddNew = () => { // usado en CalendarPage.jsx

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickEvent = () => {

        setActiveEvent({

            // _id: new Date().getTime(),
            // title: 'Hola',
            title: '',
            // notes: 'reymundo',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#fafafa',
            user: {
        
                _id: '123',
                name: 'Alexander'
            }
        });

        openDateModal();
    }

    return(

        <button
            className="btn btn-primary fab"
            onClick={ handleClickEvent }
        >

            <i className="fas fa-plus"></i> {/* simbolo + */}

        </button>
    )
}

// preparando la creacion de un nuevo evento: https://www.udemy.com/course/react-cero-experto/learn/lecture/32499238#questions
