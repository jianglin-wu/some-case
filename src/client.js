import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from '@/store';
import App from '@/pages';
import * as serviceWorker from '@/sw-register';

serviceWorker.register({
  onUpdate: () => {
    // 弹出提示，引导用户刷新页面
    // eslint-disable-next-line
    const status = window.confirm('更新 Server Worker ？');
    if (!status) {
      return;
    }
    window.location.reload();
  },
  onSuccess: () => {
    // eslint-disable-next-line
    alert('更新成功');
  },
});

// eslint-disable-next-line no-undef
const runtimeTarget = (RUNTIME_TARGET || '').toLocaleLowerCase();
const domRender = runtimeTarget === 'ssr' ? ReactDOM.hydrate : ReactDOM.render;
// eslint-disable-next-line no-underscore-dangle
const preloadedState = window.__PRELOADED_STATE__ || {};

function render() {
  domRender(
    <Provider store={createStore(preloadedState)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.querySelector('#root'),
  );
}

render();

if (module.hot) {
  module.hot.accept('./pages', () => {
    render();
  });
}
