import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import List from './pages/List';
import NotFound from './pages/NotFound';

const Router = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/list/:id" component={List} />
      <Route component={NotFound} />
    </Switch>
  </main>
);

export default Router;
