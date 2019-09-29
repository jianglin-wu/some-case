import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { actionCreators } from '@/store/posts';
import BasicLayout from '@/layouts/BasicLayout';
import stylesCommon from '@/components/styles';
import styles from './index.css';

const clsPage = classnames(stylesCommon.container, styles.page);
const dispatchConnect = dispatch => ({ actions: bindActionCreators(actionCreators, dispatch) });

@BasicLayout({ title: 'Fetch Data' })
@connect(
  ({ posts: { list } }) => ({ postsList: list }),
  dispatchConnect,
)
class Fetch extends React.Component {
  static async getInitialProps({ dispatch }) {
    const { actions } = dispatchConnect(dispatch);
    await actions.postFetch();
  }

  componentDidMount() {
    const { actions, postsList } = this.props;
    if (postsList === null) {
      actions.postFetch();
    }
  }

  render() {
    const { postsList } = this.props;
    return (
      <div className={clsPage}>
        <ul style={{ listStyle: 'none' }}>
          {(postsList || []).map(item => (
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
