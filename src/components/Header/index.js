import React from 'react';
import { Link } from 'react-router-dom';
// import stylesCommon from '@/components/styles';
import './index.less';

class Header extends React.PureComponent {
  render() {
    const { title } = this.props;
    return (
      <header styleName="header">
        <nav styleName="nav container">
          <Link to="/">Home</Link>
          {' | '}
          <Link to="/archives">Archives</Link>
          <Link style={{ float: 'right' }} to="/about">
            About
          </Link>
        </nav>
        {title && <h1 styleName="title">{title}</h1>}
      </header>
    );
  }
}

export default Header;
