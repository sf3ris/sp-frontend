import React from 'react';
import DefaultLayout from './layout/DefaultLayout';
import './app.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>

        <BrowserRouter>
          <DefaultLayout />
        </BrowserRouter>

    </div>
  );
}

export default App;
