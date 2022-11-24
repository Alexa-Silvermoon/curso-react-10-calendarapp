
export const getEnvVariables = () => { // usado en calendarApi.js

    import.meta.env; // trae las variables de entorno desde archivo .env

    return {

        ...import.meta.env

    }
    
}

