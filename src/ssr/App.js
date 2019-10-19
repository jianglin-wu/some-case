import React from 'react';
import { StaticRouter, Switch, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import routes from '../pages/routes';
import NotFind from '../pages/404';

const App = ({ url, helmetContext = {}, routerContext = {} }) => {
  return (
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url} context={routerContext}>
        <Switch>
          {routes.map(route => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Route key={route.path} {...route} />
          ))}
          <Route exact component={NotFind} />
        </Switch>
      </StaticRouter>
    </HelmetProvider>
  );
};

export default App;
