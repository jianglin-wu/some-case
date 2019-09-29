import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { actionCreators } from '@/store/posts';
import BasicLayout from '@/layouts/BasicLayout';
import stylesCommon from '@/components/styles';
import styles from './index.css';

const clsPage = classnames(stylesCommon.container, styles.page);
@BasicLayout({ title: 'Fetch Data' })
@connect(
  ({ posts: { list } }) => ({ postsList: list }),
  dispatch => ({ actions: bindActionCreators(actionCreators, dispatch) }),
)
class Fetch extends React.Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.postFetch();
  }

  render() {
    const { postsList } = this.props;
    return (
      <div className={clsPage}>
        <ul style={{ listStyle: 'none' }}>
          {postsList.map(item => (
            <li key={item.id} className={styles.postItem}>
              <div className={styles.coverBox}>
                <img src={item.cover} alt={item.title} />
                <span className={styles.date}>{item.date}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.describe}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Fetch;
