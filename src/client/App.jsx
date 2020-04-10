import React, { Component } from 'react';
import Router from './Router';

import './styles/app.global.scss';

export default class App extends Component {
  render() {
    return (
      <div className="container-l">
        <div className="page">
          <Router />
        </div>
      </div>
    );
  }
}
