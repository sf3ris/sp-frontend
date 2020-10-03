import React from 'react';
import DefaultLayout from './layout/DefaultLayout';
import './app.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './core/store';

function App() {
  return (

    <Provider store={store}>
      <div>

          <BrowserRouter>
            <DefaultLayout />
          </BrowserRouter>

      </div>
    </Provider>
  );
}

export default App;
