import React from 'react';

import styles from './Dropdown.scss';

import trash from '../assets/icons/trash.svg';
import add from '../assets/icons/add.svg';
import caret from '../assets/icons/caret.svg';
import caretBack from '../assets/icons/caret-back.svg';
import chevronUp from '../assets/icons/chevron-down.svg';
import chevronDown from '../assets/icons/chevron-up.svg';
import Icon from './Icon';

const MENU_MARGIN = 5;

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.triggerElement = React.createRef();
    this.state = {
      displayMenu: false,
    };
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideDropdownMenu);
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

  whichIcon = (option) => {
    switch (option.icon) {
      case 'caret-forward':
        return caret;
      case 'caret-back':
        return caretBack;
      case 'add':
        return add;
      case 'trash':
        return trash;
      case 'chevron-up':
        return chevronUp;
      case 'chevron-down':
        return chevronDown;
      default:
        return add;
    }
  }

  activateCallback = (option) => {
    this.hideDropdownMenu();
    if (!option.disabled) {
      option.callback();
    }
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
              <div className={`${styles.dropdownItem} ${option.disabled ? styles.disabledItem : ''}`} style={option.width ? { width: option.width } : {}} key={option.id || key}>
                <a className={`${styles.dropdownLink} ${option.type ? styles[option.type] : ''}`} href={option.href} onClick={() => this.activateCallback(option)}>
                  <Icon customClass={styles.dropdownIcon} icon={this.whichIcon(option)} />
                  <span className={styles.dropdownText}>{option.text}</span>
                  {option.combination && <span className={styles.dropdownCombination}>{option.combination}</span>}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Dropdown;
