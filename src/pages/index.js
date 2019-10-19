import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import { hot } from 'react-hot-loader/root';
import routes from '@/pages/routes';
import NotFind from '@/pages/404';
import '@/pages/index.css';

const App = () => {
  console.log(2212);
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

export default App;
// export default hot(App);
