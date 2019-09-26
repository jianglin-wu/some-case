import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './sw-register';
import App from './pages';

serviceWorker.register({
  onUpdate: registration => {
    // 弹出提示，引导用户刷新页面
    const status = window.confirm('更新 Server Worker ？');
    if (!status) {
      return;
    }
    window.location.reload();
  },
  onSuccess: () => {
    alert('更新成功');
  },
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#root'),
);
// ReactDOM.hydrate(<Home />, document.querySelector('#root'));
