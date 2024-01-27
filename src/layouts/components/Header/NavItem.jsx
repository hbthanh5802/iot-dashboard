import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function NavItem({ className, title, to }) {
  return (
    <NavLink
      className={(props) =>
        cx({
          [className]: className,
          active: props.isActive,
        })
      }
      to={to}
    >
      <span>{title}</span>
    </NavLink>
  );
}

export default NavItem;
