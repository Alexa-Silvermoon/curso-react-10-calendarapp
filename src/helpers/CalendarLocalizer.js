import { dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import esES from 'date-fns/locale/es';

const locales = { // soporte multi idiomas

  //   'en-US': enUS,
  'es': esES, /* poner en español mes año */

}

export const localizer = dateFnsLocalizer({ // usado en CalendarPage.jsx

  format,
  parse,
  startOfWeek,
  getDay,
  locales,

});

// Configuraciones adicionales al calendario https://www.udemy.com/course/react-cero-experto/learn/lecture/20344297#questions
