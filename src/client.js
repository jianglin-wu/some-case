import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import dva from 'dva';
import createLoading from 'dva-loading';
import { BrowserRouter } from 'react-router-dom';
import * as history from 'history';
import { register } from 'register-service-worker';
import { hot } from 'react-hot-loader/root';
import useModules from '@/models';
import RouteApp from '@/pages';

// eslint-disable-next-line no-undef
const runtimeTarget = (process.env.REACT_APP_RUNTIME_TARGET || '').toLocaleLowerCase();
const domRender = runtimeTarget === 'ssr' ? ReactDOM.hydrate : ReactDOM.render;
// eslint-disable-next-line no-underscore-dangle
const preloadedState = window.__PRELOADED_STATE__ || {};

const app = dva({
  history: history.createBrowserHistory,
  initialState: preloadedState,
});
app.use(createLoading());
useModules(app);

app.router(() => {
  return (
    <BrowserRouter>
      <RouteApp />
    </BrowserRouter>
  );
});
const App = app.start();

function render() {
  // domRender(
  //   <HelmetProvider>
  //     <App />
  //   </HelmetProvider>,
  //   document.querySelector('#root'),
  // );
  console.log('client');
  const MyApp = hot(() => (
    <HelmetProvider>
      <App />
    </HelmetProvider>
  ));
  domRender(<MyApp />, document.querySelector('#root'));
}

render();

// if (module.hot) {
//   module.hot.accept('./App.js', () => {
//     render();
//   });
// }

if (!navigator.onLine) {
  console.log('offline');
}

if (process.env.NODE_ENV !== 'development') {
  register('/service-worker.js', {
    registrationOptions: { scope: './' },
    ready() {
      // eslint-disable-next-line no-console
      console.log('[register-service-worker] Service worker is active.');
    },
    registered() {
      // eslint-disable-next-line no-console
      console.log('[register-service-worker] Service worker has been registered.');
    },
    cached() {
      // eslint-disable-next-line no-console
      console.log('[register-service-worker] Content has been cached for offline use.');
    },
    updatefound() {
      // eslint-disable-next-line no-console
      console.log('[register-service-worker] New content is downloading.');
    },
    updated() {
      // 弹出提示，引导用户刷新页面
      // eslint-disable-next-line
      if (!window.confirm('[register-service-worker] Server Worker 更新完成，是否立即刷新页面？')) {
        return;
      }
      window.location.reload();
    },
    offline() {
      // eslint-disable-next-line no-console
      console.log(
        '[register-service-worker] No internet connection found. App is running in offline mode.',
      );
    },
    error(error) {
      // eslint-disable-next-line no-console
      console.error('[register-service-worker] Error during service worker registration:', error);
    },
  });
}
