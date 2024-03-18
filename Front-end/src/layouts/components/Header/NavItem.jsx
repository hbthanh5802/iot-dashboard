import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function NavItem({ className, title, to, handleClick, isActive }) {
  return (
    <NavLink
      onClick={handleClick}
      className={(props) =>
        cx({
          [className]: className,
          active: props.isActive || isActive,
        })
      }
      to={to}
    >
      <span>{title}</span>
    </NavLink>
  );
}

export default NavItem;
