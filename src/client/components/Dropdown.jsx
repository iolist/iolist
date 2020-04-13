import React from 'react';

import styles from './Dropdown.scss';

const MENU_MARGIN = 5;

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.triggerElement = React.createRef();
    this.state = {
      displayMenu: false,
    };
  }

  showDropdownMenu = (event) => {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  setStyle = () => {
    // const { displayMenu } = this.state;
    // if (!displayMenu) return;

    // const contentRect = contentElem.getBoundingClientRect();
    // const triggerRect = this.triggerElement.getBoundingClientRect();
    // if (window.innerHeight < contentRect.height) { return position = 'top'; }
    // if (window.innerHeight - triggerRect.y - triggerRect.height < contentRect.height) { return position = 'bottom'; }
    // return position = 'top';
  }

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.hideDropdownMenu);
  }

  render() {
    const { trigger, options } = this.props;
    const { displayMenu } = this.state;
    const triggerHeight = this.triggerElement.current ? this.triggerElement.current.getBoundingClientRect().height : 0;

    return (
      <div className={styles.dropdown}>
        <div
          className={styles.dropdownTrigger}
          role="button"
          ref={this.triggerElement}
          onClick={this.showDropdownMenu}
        >
          {trigger}
        </div>
        { displayMenu && (
          <div className={styles.dropdownMenu} style={{ top: triggerHeight + MENU_MARGIN }}>
            {options.map((option, key) => (
              <div className={styles.dropdownItem} style={option.width ? { width: option.width } : {}} key={option.id || key}>
                <a className={styles.dropdownLink} href={option.href} onClick={() => { this.hideDropdownMenu(); option.callback(); }}>{option.text}</a>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Dropdown;
