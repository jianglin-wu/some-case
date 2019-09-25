import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './index.css';

import Home from './Home';
import About from './About';

export default () => {
  return (
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/" component={Home} />
    </Switch>
  );
};
