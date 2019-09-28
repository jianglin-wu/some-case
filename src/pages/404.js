import React from 'react';
import { Link } from 'react-router-dom';
import BasicLayout from '@/layouts/BasicLayout';
import stylesCommon from '@/components/styles';

@BasicLayout({ title: '页面没找到' })
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
