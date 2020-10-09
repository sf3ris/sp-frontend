import React from 'react';
import './app.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './core/store';
import Router from './routes/Router';

function App() {

  return (

    <Provider store={store}>
      <div>

          <BrowserRouter>
            <Router />
          </BrowserRouter>

      </div>
    </Provider>
  );
}

export default App;
