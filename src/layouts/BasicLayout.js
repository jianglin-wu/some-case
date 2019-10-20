import React from 'react';
// import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import logo from '@/assets/hx-icon.svg';

const footerRender = () => {
  return <div>Copyright 嗨学互联网中心</div>;
};

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
      footerRender={footerRender}
    >
      {children}
    </ProLayout>
  );
};

export default BasicLayout;
