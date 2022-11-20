import { useMemo, useState, useEffect } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // estilo del DatePicker

// poner el DatePicker y su hora en español
import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale( 'es', es );

const customStyles = {

    content: {

      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',

    },
};

Modal.setAppElement('#root'); // mismo root de index.html

export const CalendarModal = () => { // usado en CalendarPage.jsx

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();

    // el modal es un cuadro de texto que contiene algun tipo de mensaje, trae propiedades css desde styles.css
   // const [isOpen, setIsOpen] = useState( true ); // modal por defecto estara abierto

    const [ formSubmitted, setFormSubmitted ] = useState(false);

    const [formValues, setFormValues] = useState({

        title: '',
        notes: '',
        start: new Date(),
        end: addHours( new Date(), 2),

    });

    const titleClass = useMemo(() => { // useMemo para memorizar valores

        if ( !formSubmitted ) return ''; // si formSubmitted NO se ha disparado para postearse, regresar un string vacio en clase

        return ( formValues.title.length > 0 ) // si formulario ya se disparo pero longitud de titulo...

            ? '' // si es mayor a 0, lo deje vacio para que no muestre el verde
            : 'is-invalid'; // si NO es mayor a 0, se pone en rojo el input

    }, [ formValues.title, formSubmitted ]) // dependencias, se memoriza ese valor si el titulo o formSubmitted cambia

    useEffect(() => {

      if ( activeEvent !== null ) {

        setFormValues({ ...activeEvent });

      }    
      
    }, [ activeEvent ])
    


    const onInputChanged = ({ target }) => { // tiene en cuenta los cambios en los input, ya que sino el valor seria de solo lectura

        setFormValues({

            ...formValues,
            [target.name]: target.value

        })
    }

    const onDateChanged = ( event, changing ) => { // tiene en cuenta los cambios en DatePicker, ya que sino la fecha seria de solo lectura

        setFormValues({

            ...formValues,
            [changing]: event

        })
    }

    const onCloseModal = () => {

        // console.log('cerrando modal');
        closeDateModal();

    }

    const onSubmit = async( event ) => {

        event.preventDefault(); // prevenir refrescar el navegador al dar click en boton guardar
        setFormSubmitted(true); // el formulario se intento postear

        const difference = differenceInSeconds( formValues.end, formValues.start ); // saber cual es la diferencia en segundos entre fechas
        // console.log( { difference } );
        // si resultado es NaN, significa que se borro alguno de los input, por ende tampoco es permitido

        if ( isNaN( difference ) || difference <= 0 ) {

            Swal.fire('Fechas incorrectas','Revisar las fechas ingresadas','error'); // alerta sweetalert
            return;

        }
        
        if ( formValues.title.length <= 0 ) return;
        
        console.log(formValues);

        // TODO: 
        await startSavingEvent( formValues ); // agregar una nueva nota
        closeDateModal(); // cierra el modal
        setFormSubmitted(false); // despues de guardada el evento, se regresa a su estao original

    }

  return (

    <Modal
        isOpen={ isDateModalOpen }
        onRequestClose={ onCloseModal }
        style={ customStyles }
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
    >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={ onSubmit }>

            <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                <DatePicker 
                    selected={ formValues.start }
                    onChange={ (event) => onDateChanged(event, 'start') }
                    className="form-control" /* estira el input de DatePicker */
                    dateFormat="Pp" /* muestra la hora, minutos y AM o PMs */
                    showTimeSelect /* permite modificar la hora */
                    locale="es" /* pone en español el DatePicker */
                    timeCaption="Hora" /* pone en español la hora del DatePicker */
                />
            </div>

            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <DatePicker 
                    minDate={ formValues.start } /* no permite seleccionar una fecha anterior a la del inicio */
                    selected={ formValues.end }
                    onChange={ (event) => onDateChanged(event, 'end') }
                    className="form-control" /* estira el input de DatePicker */
                    dateFormat="Pp" /* muestra la hora, minutos y AM o PMs */
                    showTimeSelect /* permite modificar la hora */
                    locale="es" /* pone en español el DatePicker */
                    timeCaption="Hora" /* pone en español la hora del DatePicker */
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={ `form-control ${ titleClass }`}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={ formValues.title }
                    onChange={ onInputChanged }
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={ formValues.notes }
                    onChange={ onInputChanged }
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>

    </Modal>

  )

}

// creando un modal sobre el calendario: https://www.udemy.com/course/react-cero-experto/learn/lecture/20345787#questions
// npm react date picker: https://www.npmjs.com/package/react-datepicker
// contenido del modal y DatePicker https://www.udemy.com/course/react-cero-experto/learn/lecture/32497908?start=0#questions
// obtener informacion del formulario del evento
// validaciones del formulario
// mostrar y ocultar modal: https://www.udemy.com/course/react-cero-experto/learn/lecture/20349211?start=450#questions
// cargar un evento en un modal: https://www.udemy.com/course/react-cero-experto/learn/lecture/32499164?start=240#questions
// añadir un nuevo evento: https://www.udemy.com/course/react-cero-experto/learn/lecture/20360111#questions
