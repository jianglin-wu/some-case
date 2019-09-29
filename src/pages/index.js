import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import './index.css';
import routes from './routes';
import NotFind from './404';

const App = () => {
  return (
    <Switch>
      {routes.map(route => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Route key={route.path} {...route} />
      ))}
      <Route exact component={NotFind} />
    </Switch>
  );
};

export default hot(App);
