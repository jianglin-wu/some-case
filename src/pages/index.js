import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import './index.css';

import Home from './Home';
import About from './About';
import State from './State';
import Store from './Store';
import NotFind from './404';

const App = () => {
  return (
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/state" component={State} />
      <Route path="/store" component={Store} />
      <Route path="/" component={Home} exact />
      <Route component={NotFind} exact />
    </Switch>
  );
};

export default hot(App);
