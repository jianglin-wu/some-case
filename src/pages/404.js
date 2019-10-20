import React from 'react';
import { Link } from 'react-router-dom';
import stylesCommon from '@/components/styles';

class NotFind extends React.Component {
  render() {
    return (
      <div className={stylesCommon.container}>
        <Link to="/">回到首页</Link>
      </div>
    );
  }
}

export default NotFind;
