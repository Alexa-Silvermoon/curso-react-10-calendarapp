import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables()

const calendarApi = axios.create({ // usado en useAuthStore.js

    baseURL: VITE_API_URL

});

// Todo: configurar interceptores
calendarApi.interceptors.request.use( config => {

    // interceptar la ruta y los Headers y el x-token en localhost:4000/api/auth/renew
    config.headers = {

        ...config.headers, // exparsir todos los headers que vengan en la configuracion ( si es que vienen )

        // lo que se hace aqui es traer el token desde el backend, tenerlo en el frontend
        // y luego enviarselo al backend por la ruta localhost:4000/api/auth/renew y si el token no esta presente o ya expiro
        // haria que el backend devuelva el mensaje de que ese usuario no esta autenticado
        'x-token': localStorage.getItem('token')

    }

    return config;

})

export default calendarApi;

// AXIOS configurar cliente para peticions http: https://www.udemy.com/course/react-cero-experto/learn/lecture/32533774?start=15#questions
