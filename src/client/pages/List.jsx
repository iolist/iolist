import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Loader from '../components/Loader';
import Node from '../components/Node';
import Icon from '../components/Icon';
import Dropdown from '../components/Dropdown';

import { addEmptyNode, fetchList, updateInfo } from '../store/actions/list';
import { deleteList } from '../store/actions/lists';
import { getChildNodes } from '../utils/tree';

import ellipsis from '../assets/icons/ellipsis-vertical.svg';
import add from '../assets/icons/add.svg';

import styles from './List.scss';

const TIME_TO_UPDATE = 1300;

export class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      changed: false
    };

    this.syncTimeout = null;
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchList(match.params.id));
  }

  componentDidUpdate(prevProps) {
    const { list } = this.props;
    const { list: prevList } = prevProps;
    const { name } = this.state;
    if (list.info.name !== name && list.info.name !== prevList.info.name) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ name: list.info.name }); // update name if it comes from store
    }
  }

  componentWillUnmount() {
    clearTimeout(this.syncTimeout);
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

  syncList = () => {
    const { changed, name } = this.state;
    const { dispatch } = this.props;
    if (changed) {
      this.setState({ changed: false });
      dispatch(updateInfo({ name }));
    }
  }

  changeName = (e) => {
    this.setState({ name: e.target.value, changed: true });
    clearTimeout(this.syncTimeout);
    this.syncTimeout = setTimeout(() => {
      this.syncList();
    }, TIME_TO_UPDATE);
  }

  deleteThisList = async () => {
    const { dispatch, list, history } = this.props;
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure? This list will be removed!')) {
      await dispatch(deleteList(list.info.id));
      history.push('/');
    }
  }

  render() {
    const { list, parents } = this.props;
    const { name } = this.state;
    if (list.isFetching) {
      return <Loader />;
    }
    return (
      <Fragment>
        <div className={styles.listMenu}>
          <Dropdown
            trigger={<Icon customClass={styles.icon} icon={ellipsis} />}
            options={[
              {
                icon: 'trash',
                text: 'Delete this list',
                type: 'red',
                callback: () => this.deleteThisList()
              }
            ]}
          />
        </div>
        <textarea
          className={styles.listHeader}
          onChange={this.changeName}
          value={name}
          rows="1"
        />
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
