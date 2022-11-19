
// export const CalendarEvent = ( { props } ) => { // usado en CalendarPage.jsx
export const CalendarEvent = ( { event } ) => { // usado en CalendarPage.jsx

    // es el cuadrito de cada dia donde aparecen los detalles si hay un evento

    // const { title, user } = event;
    const { titulo, usuario } = event;

    // console.log( props );
    // console.log( {title, user} );

    return (

        <>
            {/* <strong>{ title }</strong> */}
            <strong>{ titulo }</strong>
            {/* <span> - { user.name }</span> */}
            <span> - { usuario.nombre }</span>
        
        </>
    )
}

// personalizar el cuadro del evento https://www.udemy.com/course/react-cero-experto/learn/lecture/20345291#questions
