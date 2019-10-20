import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Fetch from './Fetch';
import About from './About';
import Saga from './Saga';
import State from './State';
import Store from './Store';
import BasicLayout from '../layouts/BasicLayout';
import NotFind from '@/pages/404';

export const getRoutes = routes => {
  const mapRoutes = ({
    path,
    exact = false,
    component: RouteComponent,
    render: RouteRender,
    routes: childRoutes = [],
    redirect,
  }) => {
    if (redirect) {
      return <Redirect key={path} from={path} to={redirect} />;
    }
    return (
      <Route
        key={path}
        path={path}
        exact={exact}
        render={routeProps => {
          const Component = RouteComponent || RouteRender;
          if (!Component) {
            return getRoutes(childRoutes);
          }
          return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Component {...routeProps} childRoutes={childRoutes}>
              {getRoutes(childRoutes)}
            </Component>
          );
        }}
      />
    );
  };
  return (
    <Switch>
      {routes.map(mapRoutes)}
      <Route exact component={NotFind} />
    </Switch>
  );
};

export default [
  {
    path: '/',
    component: BasicLayout,
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        icon: 'smile',
        exact: true,
      },
      {
        path: '/fetch',
        name: 'Fetch',
        component: Fetch,
        icon: 'smile',
      },
      {
        path: '/state',
        name: 'State',
        component: State,
        icon: 'smile',
      },
      {
        path: '/store',
        name: 'Store',
        component: Store,
        icon: 'smile',
      },
      {
        path: '/saga',
        name: 'Saga',
        component: Saga,
        icon: 'smile',
      },
      {
        path: '/about',
        name: 'About',
        component: About,
        icon: 'smile',
      },
    ],
  },
];
