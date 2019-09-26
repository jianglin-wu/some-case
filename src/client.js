import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as serviceWorker from './sw-register';
import App from './pages';

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

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root'),
);
// ReactDOM.hydrate(<Home />, document.querySelector('#root'));
