import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Loader from '../components/Loader';
import Node from '../components/Node';

import { fetchList } from '../store/actions/list';
import { getChildNodes } from '../utils/tree';

export class List extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchList(match.params.id));
  }

  render() {
    const { list, parents } = this.props;
    if (list.isFetching) {
      return <Loader />;
    }
    return (
      <Fragment>
        <h1>{list.info.name}</h1>
        {parents.map(node => (
          <Node node={node} key={node.id} />
        ))}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ list }) => ({
  parents: getChildNodes(list.nodes),
  list
});

export default connect(mapStateToProps)(List);
