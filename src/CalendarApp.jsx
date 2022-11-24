import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { store } from './store';

export const CalendarApp = () => { // usado en main.jsx

  return (

    <Provider store={ store }>
      <BrowserRouter>
      {/* <HashRouter> */}

        <AppRouter />

      {/* </HashRouter> */}
      </BrowserRouter>
    </Provider>

  )
}

// instalacion y configuracion de reduc: https://www.udemy.com/course/react-cero-experto/learn/lecture/20348599#questions

/* 
return (

    <Provider store={ store }>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>

  )
*/