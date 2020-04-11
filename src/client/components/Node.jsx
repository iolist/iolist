import React, { Component } from 'react';
// import styles from './Node.scss';

export class Node extends Component {
  componentDidMount() {

  }

  render() {
    const { node } = this.props;
    return (
      <div>{node.id}</div>
    );
  }
}

export default Node;
