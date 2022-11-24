
export const getEnvVariables = () => { // usado en calendarApi.js

    // import.meta.env; // trae las variables de entorno desde archivo .env ACTIVAR SOLO EN DESARROLLO ESTA LINEA

    return {

        VITE_API_URL: import.meta.env.VITE_API_URL, // activar SOLO en modo de produccion para el yarn build
        // ...import.meta.env                      // activar SOLO en modo desarrollo

    }
    
}

// generar version de produccion: https://www.udemy.com/course/react-cero-experto/learn/lecture/20427303#questions/12911354
