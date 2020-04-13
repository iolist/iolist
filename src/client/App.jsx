import React, { Fragment } from 'react';
import Router from './Router';
import Header from './components/Header';

import './styles/app.global.scss';

export const App = () => (
  <Fragment>
    <Header />
    <div className="container-l">
      <div className="page">
        <Router />
      </div>
    </div>
  </Fragment>

);

export default App;
