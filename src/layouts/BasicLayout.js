import React from 'react';
// import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ProLayout from '@ant-design/pro-layout';
import logo from '@/assets/hx-icon.svg';

const Title = ({ text }) => (
  <span style={{ color: '#007aff', marginBottom: -8, display: 'block' }}>{text}</span>
);

const BasicLayout = props => {
  const { children, childRoutes } = props;
  return (
    <ProLayout
      title={<Title text="fe-antd-demo" />}
      logo={logo}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      menuDataRender={() => childRoutes}
      footerRender={() => <div />}
    >
      {children}
    </ProLayout>
  );
};

export default BasicLayout;
