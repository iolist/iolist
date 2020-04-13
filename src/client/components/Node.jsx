
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Loader from './Loader';
import Icon from './Icon';
import Dropdown from './Dropdown';

import { getChildNodes } from '../utils/tree';

import ellipsis from '../assets/icons/ellipsis-vertical.svg';
import ellipse from '../assets/icons/ellipse.svg';
import caret from '../assets/icons/caret.svg';

import styles from './Node.scss';

export class Node extends Component {
  constructor(props) {
    super(props);

    this.textarea = React.createRef();

    this.state = {
      collapsed: false,
    };
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    // this.calculateSizeOfTextarea();
  }

  changeTitle = () => {
    this.calculateSizeOfTextarea();
  }

  calculateSizeOfTextarea = () => {
    if (this.textarea.current) {
      this.textarea.current.style.height = 'auto';
      this.textarea.current.style.height = `${this.textarea.current.scrollHeight}px`;
    }
  }

  render() {
    const { node, children } = this.props;
    const { collapsed } = this.state;
    console.log(node.title, children);
    return (
      <Fragment>
        <div className={styles.node}>
          <div className={styles.present}>
            <div className={styles.menu}>
              <div className={styles.ellipsis}>
                {node.id
                  ? (
                    <Dropdown
                      trigger={<Icon customClass={styles.icon} icon={ellipsis} />}
                      options={[
                        { text: 'Delete', callback: () => { console.log('Delete'); } },
                        { text: 'Add node', callback: () => { console.log('Add node'); } }
                      ]}
                    />
                  )
                  : <span className={`${styles.icon} ${styles.loading}`}><Loader adaptive /></span>
                  }
              </div>

              <div className={styles.point} onClick={() => this.setState(state => ({ collapsed: !state.collapsed }))}>
                {children && children.length ? (
                  <div className={`${styles.caret} ${collapsed ? styles.collapsed : ''}`}>
                    <Icon icon={caret} />
                  </div>
                ) : (
                  <div className={styles.bullet}>
                    <Icon icon={ellipse} />
                  </div>
                )}
              </div>
            </div>

            <textarea
              className={styles.title}
              ref={this.textarea}
              onChange={this.changeTitle}
              defaultValue={node.title}
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
  children: getChildNodes(list.nodes, ownProps.node.id)
});

const ConnectedNode = connect(mapStateToProps)(Node);
export default ConnectedNode;
