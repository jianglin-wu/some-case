import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { hot } from 'react-hot-loader/root';

import routes from '@/pages/routes';
import NotFind from '@/pages/404';
import '@/pages/index.css';

if (module.hot) {
  module.hot.accept();
}

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Switch>
          {routes.map(route => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Route key={route.path} {...route} />
          ))}
          <Route exact component={NotFind} />
        </Switch>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default hot(App);
