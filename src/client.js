import React from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';
import ReactDOM from 'react-dom';
import * as history from 'history';
import { register } from 'register-service-worker';
import { setConfig } from 'react-hot-loader';
import useModules from '@/models';
import App from '@/App';

setConfig({
  logLevel: 'debug',
  trackTailUpdates: false, // 禁止 react-hot-loader 在被装饰器包装的组件更新时会提示警告
});

const app = dva({
  history: history.createBrowserHistory,
  initialState: window.__PRELOADED_STATE__ || {}, // eslint-disable-line no-underscore-dangle
});

app.use(createLoading());

useModules(app);

app.router(() => <App />);

const Main = app.start();

// eslint-disable-next-line no-undef
const runtimeTarget = (process.env.REACT_APP_RUNTIME_TARGET || '').toLocaleLowerCase();
const domRender = runtimeTarget === 'ssr' ? ReactDOM.hydrate : ReactDOM.render;
domRender(<Main />, document.querySelector('#root'));

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
