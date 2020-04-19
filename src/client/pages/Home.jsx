import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Icon from '../components/Icon';
import { Loader } from '../components/Loader';
import { fetchLists, addNewList } from '../store/actions/lists';
import add from '../assets/icons/add.svg';
import styles from './Home.scss';

export class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchLists());
  }

  addNewList = () => {
    const { dispatch } = this.props;
    dispatch(addNewList({ name: 'New List' }));
  }

  render() {
    const { lists } = this.props;
    if (lists.isFetching) {
      return <Loader />;
    }
    return (
      <Fragment>
        <h1 className={styles.header}>This is Home page</h1>
        <div className="row">
          {lists.value && lists.value.map(item => (
            <div className="col-12 col-6-m" key={item.id}>
              <Link className={styles.list} to={`/list/${item.id}`}>
                {item.name}
              </Link>
            </div>

          ))}
          <div className="col-12 col-6-m">
            <button type="button" className={styles.addButton} onClick={this.addNewList}>
              <Icon customClass={styles.icon} icon={add} />
            </button>
          </div>

        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(Home);
