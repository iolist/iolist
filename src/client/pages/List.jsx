import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Loader from '../components/Loader';
import Node from '../components/Node';
import Icon from '../components/Icon';

import { addEmptyNode, fetchList } from '../store/actions/list';
import { getChildNodes } from '../utils/tree';

import add from '../assets/icons/add.svg';

import styles from './List.scss';

export class List extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchList(match.params.id));
  }

  addNewNode = () => {
    const { dispatch, list } = this.props;
    dispatch(addEmptyNode({
      list_id: list.info.id,
      parent_id: null,
      title: '',
      previous_id: null
    }));
  }

  render() {
    const { list, parents } = this.props;
    if (list.isFetching) {
      return <Loader />;
    }
    return (
      <Fragment>
        <h1 className={styles.listHeader}>{list.info.name}</h1>
        {parents.map(node => (
          <Node node={node} key={node.id} />
        ))}
        {!parents.length && (
        <button type="button" className={styles.listAddNode} onClick={this.addNewNode}>
          <Icon customClass={styles.icon} icon={add} />
        </button>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ list }) => ({
  parents: getChildNodes(list.nodes),
  list
});

export default connect(mapStateToProps)(List);
