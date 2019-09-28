import React from 'react';
import { Link } from 'react-router-dom';
import BasicLayout from '@/layouts/BasicLayout';
import stylesCommon from '@/components/styles';

@BasicLayout({ title: 'Home' })
class Home extends React.Component {
  render() {
    return (
      <div className={stylesCommon.container}>
        <ul>
          <li>
            <Link to="/state">State Demo</Link>
          </li>
          <li>
            <Link to="/store">Store Demo</Link>
          </li>
          <li>
            <Link to="/saga">Saga Demo</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Home;
