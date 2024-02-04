import { useContext, useId } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { TiHome } from 'react-icons/ti';
import { FaMoon } from 'react-icons/fa';
import { IoSunny } from 'react-icons/io5';
import { ThemeContext } from '@/contexts/ThemeContext';
import NavItem from './NavItem';
// import SwitchButton from '@/components/SwitchButton';

const cx = classNames.bind(styles);

function Header() {
  const themeId = useId();
  const { dark, handleToggleDark } = useContext(ThemeContext);

  return (
    <div className={cx('wrapper', { dark })}>
      <Link to={'/'} className={cx('title')}>
        <span className={cx('title-icon')}>
          <TiHome className={cx('icon')} />
        </span>
        Dashboard
      </Link>
      <nav className={cx('nav')}>
        <NavItem className={cx('nav-link')} title={'History'} to={'/history'} />
        <NavItem className={cx('nav-link')} title={'Profile'} to={'/profile'} />
      </nav>
      <div className={cx('theme-wrapper')}>
        <label htmlFor={themeId} className={cx('theme-label')}>
          <input
            type="checkbox"
            name="theme"
            id={themeId}
            className={cx('theme-input')}
            onChange={handleToggleDark}
            checked={dark}
          />
          <span className={cx('theme-icon', 'moon-icon')}>
            <FaMoon />
          </span>
          <span className={cx('theme-icon', 'sun-icon')}>
            <IoSunny />
          </span>
          <span className={cx('toggle')}></span>
        </label>
      </div>
    </div>
  );
}

export default Header;
