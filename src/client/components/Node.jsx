
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Loader from './Loader';
import Icon from './Icon';
import Dropdown from './Dropdown';

import {
  addNode, deleteNode, updateNode, toggleNodeChilden
} from '../store/actions/list';

import { getChildNodes } from '../utils/tree';
import {
  isCaretPositionAt, setCaretPositionToEnd, setCaretPositionTo, setCaretPositionToBegin
} from '../utils/text';

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
      title: '',
      changed: false
    };
  }

  componentDidMount() {
    const { node } = this.props;
    this.setState({ title: node.title });
  }

  componentDidUpdate(prevProps) {
    const { node: prevNode } = prevProps;
    const { node } = this.props;
    const { title } = this.state;
    if (!prevNode) {
      return;
    }
    if (node.title !== prevNode.title && node.title !== title) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ title: node.title }); // update title if it comes from store
    }
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

  handleKeydown = async (e) => {
    const { node, allNodes, dispatch } = this.props;
    const { title } = this.state;
    console.log(e.key, e.shiftKey);
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
            if (title) {
              const prevNode = allNodes.find(n => n.id === node.previous_id);
              await dispatch(updateNode(node.previous_id, { title: prevNode.title + title }));
            }
            setCaretPositionToEnd(this.getPreviousNode());
            this.deleteThisNode();
          }
        }
        break;
      case 'Enter': {
        e.preventDefault();
        if (node.temp) {
          return;
        }
        const newTitle = title.slice(0, this.textarea.current.selectionStart);
        const newNodeTitle = title.slice(this.textarea.current.selectionEnd, title.length);
        dispatch(updateNode(node.id, { title: newTitle }));
        this.addNewNode(newNodeTitle);
        break;
      }

      case 'Tab': {
        e.preventDefault();
        if (e.shiftKey) {
          this.unIndentNode();
        } else {
          this.indentNode();
        }
        break;
      }


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
    setCaretPositionTo(this.getNextNode(), title.length);
  }

  deleteThisNode = () => {
    const { dispatch, node } = this.props;
    clearTimeout(this.syncTimeout);
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

  indentNode = async () => {
    const { dispatch, node, allNodes } = this.props;
    if (node.previous_id) {
      const nextNode = allNodes.find(n => n.previous_id === node.id);
      const parentNodeChildren = getChildNodes(allNodes, node.previous_id);
      await dispatch(updateNode(node.id, {
        parent_id: node.previous_id,
        previous_id: parentNodeChildren.length ? parentNodeChildren[parentNodeChildren.length - 1].id : null // if parent has children - use last one as previous
      }));
      if (nextNode) {
        // update next node in order not to lose link on previous
        dispatch(updateNode(nextNode.id, { previous_id: node.previous_id }));
      }
    }
  }

  unIndentNode = async () => {
    const { dispatch, node, allNodes } = this.props;
    if (node.parent_id) {
      const nextParentNode = allNodes.find(n => n.previous_id === node.parent_id);
      const parentNode = allNodes.find(n => n.id === node.parent_id);
      const nextNode = allNodes.find(n => n.previous_id === node.id);
      if (parentNode) {
        await dispatch(updateNode(node.id, { parent_id: parentNode.parent_id, previous_id: node.parent_id }));
        if (nextNode) {
          // update next node in order not to lose link on previous
          dispatch(updateNode(nextNode.id, { previous_id: node.previous_id }));
        }
        if (nextParentNode) {
          // update next parent node id to link on this node
          dispatch(updateNode(nextParentNode.id, { previous_id: node.id }));
        }
      }
    }
  }

  toggleChilden = () => {
    const { dispatch, node } = this.props;
    dispatch(toggleNodeChilden(node.id));
  }

  calculateSizeOfTextarea = () => {
    if (this.textarea.current) {
      this.textarea.current.style.height = 'auto';
      this.textarea.current.style.height = `${this.textarea.current.scrollHeight}px`;
    }
  }

  render() {
    const { node, children, collapsed } = this.props;
    const { title, changed } = this.state;
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
                        { text: 'Add node', callback: () => this.addNewNode() },
                        { text: 'Indent', callback: () => this.indentNode() },
                        { text: 'UnIndent', callback: () => this.unIndentNode() }
                      ]}
                    />
                  )
                  : <span className={`${styles.icon} ${styles.loading}`}><Loader adaptive /></span>
                  }
              </div>

              <div className={styles.point} onClick={this.toggleChilden}>
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
  allNodes: list.nodes,
  collapsed: list.collapsed.indexOf(ownProps.node.id) !== -1
});

const ConnectedNode = connect(mapStateToProps)(Node);
export default ConnectedNode;
