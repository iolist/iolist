
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Loader from './Loader';
import Icon from './Icon';
import Dropdown from './Dropdown';

import { addNode, deleteNode, updateNode } from '../store/actions/list';

import { getChildNodes } from '../utils/tree';
import { isCaretPositionAt, setCaretPositionToEnd, setCaretPositionToBegin } from '../utils/text';

import ellipsis from '../assets/icons/ellipsis-vertical.svg';
import ellipse from '../assets/icons/ellipse.svg';
import caret from '../assets/icons/caret.svg';

import styles from './Node.scss';

const TIME_TO_UPDATE = 1300;

export class Node extends Component {
  constructor(props) {
    super(props);

    this.textarea = React.createRef();
    this.syncTimeout = null;

    this.state = {
      collapsed: false,
      title: '',
      changed: false
    };
  }

  componentDidMount() {
    const { node } = this.props;
    this.setState({ title: node.title });
  }

  getPreviousNode = () => {
    const listOfElements = document.getElementsByTagName('textarea');
    for (let i = 0; i < listOfElements.length; i += 1) {
      if (listOfElements[i] === this.textarea.current) {
        if (i !== 0) {
          return listOfElements[i - 1];
        }
      }
    }
    return null;
  }

  getNextNode = () => {
    const listOfElements = document.getElementsByTagName('textarea');
    for (let i = 0; i < listOfElements.length; i += 1) {
      if (listOfElements[i] === this.textarea.current) {
        if (i !== listOfElements.length - 1) {
          return listOfElements[i + 1];
        }
      }
    }
    return null;
  }

  handleKeydown = (e) => {
    const { node } = this.props;
    const { title } = this.state;
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        if (isCaretPositionAt(e.target, 0)) {
          e.preventDefault();
          setCaretPositionToEnd(this.getPreviousNode());
        }
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        if (isCaretPositionAt(e.target, title.length)) {
          e.preventDefault();
          setCaretPositionToBegin(this.getNextNode());
        }
        break;

      case 'Backspace':
        if (isCaretPositionAt(e.target, 0)) {
          e.preventDefault();
          if (node.previous_id) {
            setCaretPositionToEnd(this.getPreviousNode());
          }
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (!node.id) {
          return;
        }
        setCaretPositionToBegin(this.getNextNode());
        break;
      default:
        return;
    }
  }

  addNewNode = async (title = '') => {
    const { dispatch, node } = this.props;
    const tempId = `${Date.now()}_t`;
    await dispatch(addNode(tempId, {
      list_id: node.list_id,
      parent_id: node.parent_id,
      title,
      previous_id: node.id
    }));
    setCaretPositionToBegin(this.getNextNode());
  }

  deleteThisNode = () => {
    const { dispatch, node } = this.props;
    dispatch(deleteNode(node.id));
  }

  syncNode = () => {
    const { changed, title } = this.state;
    const { dispatch, node } = this.props;
    if (changed) {
      this.setState({ changed: false });
      dispatch(updateNode(node.id, { title }));
    }
  }

  changeTitle = (e) => {
    this.calculateSizeOfTextarea();
    this.setState({ title: e.target.value, changed: true });
    clearTimeout(this.syncTimeout);
    this.syncTimeout = setTimeout(() => {
      this.syncNode();
    }, TIME_TO_UPDATE);
  }

  calculateSizeOfTextarea = () => {
    if (this.textarea.current) {
      this.textarea.current.style.height = 'auto';
      this.textarea.current.style.height = `${this.textarea.current.scrollHeight}px`;
    }
  }

  render() {
    const { node, children } = this.props;
    const { collapsed, title, changed } = this.state;
    const indicatorClass = `${changed ? styles.unsynced : ''} ${node.lost ? styles.lost : ''}`;
    if (!node) return null;
    return (
      <Fragment>
        <div className={styles.node}>
          <div className={styles.present}>
            <div className={styles.menu}>
              <div className={styles.ellipsis}>
                {!node.temp
                  ? (
                    <Dropdown
                      trigger={<Icon customClass={styles.icon} icon={ellipsis} />}
                      options={[
                        { text: 'Delete', callback: () => this.deleteThisNode() },
                        { text: 'Add node', callback: () => this.addNewNode() }
                      ]}
                    />
                  )
                  : <span className={`${styles.icon} ${styles.loading}`}><Loader adaptive /></span>
                  }
              </div>

              <div className={styles.point} onClick={() => this.setState(state => ({ collapsed: !state.collapsed }))}>
                {children && children.length ? (
                  <div className={`${styles.caret} ${collapsed ? styles.collapsed : ''}`}>
                    <Icon icon={caret} customClass={indicatorClass} />
                  </div>
                ) : (
                  <div className={styles.bullet}>
                    <Icon icon={ellipse} customClass={indicatorClass} />
                  </div>
                )}
              </div>
            </div>

            <textarea
              className={styles.title}
              ref={this.textarea}
              onChange={this.changeTitle}
              value={title}
              onKeyDown={this.handleKeydown}
              rows="1"
            />
          </div>
          {!collapsed && (
            <div className={styles.children}>
              {children && children.map(child => (
                child && <ConnectedNode node={child} key={child.id} />
              ))}
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ list }, ownProps) => ({
  children: getChildNodes(list.nodes, ownProps.node.id),
});

const ConnectedNode = connect(mapStateToProps)(Node);
export default ConnectedNode;
