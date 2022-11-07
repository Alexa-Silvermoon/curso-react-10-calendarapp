
// export const CalendarEvent = ( { props } ) => { // usado en CalendarPage.jsx
export const CalendarEvent = ( { event } ) => { // usado en CalendarPage.jsx

    // es el cuadrito de cada dia donde aparecen los detalles si hay un evento

    const { title, user } = event;

    // console.log( props );
    console.log( {title, user} );

    return (

        <>
            <strong>{ title }</strong>
            <span> - { user.name }</span>
        
        </>
    )
}

// personalizar el cuadro del evento https://www.udemy.com/course/react-cero-experto/learn/lecture/20345291#questions
