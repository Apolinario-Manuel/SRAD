import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import ContextProvider from './views/login/hooks/context';

ReactDOM.render((
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
