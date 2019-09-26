import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import stylesCommon from '@/components/styles';

export default class Home extends React.Component {
  render() {
    return (
      <Fragment>
        <Header title="页面没找到" />
        <div className={stylesCommon.container}>
          <Link to="/">回到首页</Link>
        </div>
      </Fragment>
    );
  }
}
