import React from 'react';
import { Link } from 'react-router-dom';
import '@/components/styles/index.less';

// eslint-disable-next-line react/prefer-stateless-function
class NotFind extends React.Component {
  render() {
    return (
      <div styleName="container">
        <Link to="/">回到首页</Link>
      </div>
    );
  }
}

export default NotFind;
