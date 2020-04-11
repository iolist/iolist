import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchLists } from '../store/actions/lists';

// Styles
import styles from './Home.scss';

export class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchLists());
  }

  render() {
    const { lists } = this.props;
    return (
      <Fragment>
        <h1>This is Home page</h1>
        <div className="row">
          {lists.value && lists.value.map(item => (
            <Link className={`col-12 col-6-m ${styles.list}`} to={`/list/${item.id}`}>
              {item.name}
            </Link>
          ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(Home);
