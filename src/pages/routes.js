import Home from './Home';
import Fetch from './Fetch';
import About from './About';
import Saga from './Saga';
import State from './State';
import Store from './Store';

export default [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/fetch',
    component: Fetch,
    exact: true,
  },
  {
    path: '/about',
    component: About,
    exact: true,
  },
  {
    path: '/state',
    component: State,
    exact: true,
  },
  {
    path: '/store',
    component: Store,
    exact: true,
  },
  {
    path: '/saga',
    component: Saga,
    exact: true,
  },
];
