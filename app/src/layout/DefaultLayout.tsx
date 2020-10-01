import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Router from '../routes/Router';

const DefaultLayout : React.FC<{}> = props => {

    return (

      <div>
        <Sidebar />

        <section className="page-content">
        
          <Header />

          <Router />

        </section>


      </div>

    )

}

export default DefaultLayout;