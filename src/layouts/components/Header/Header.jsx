import { useContext, useId } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { TiHome } from 'react-icons/ti';
import { FaMoon } from 'react-icons/fa';
import { IoSunny } from 'react-icons/io5';
import { ThemeContext } from '@/contexts/ThemeContext';
// import SwitchButton from '@/components/SwitchButton';

const cx = classNames.bind(styles);

function Header() {
  const themeId = useId();
  const { dark, handleToggleDark } = useContext(ThemeContext);

  return (
    <div className={cx('wrapper', { dark })}>
      <h3 className={cx('title')}>
        <span className={cx('title-icon')}>
          <TiHome className={cx('icon')} />
        </span>
        Dashboard
      </h3>
      <div className={cx('theme-wrapper')}>
        <label htmlFor={themeId} className={cx('theme-label')}>
          <input type="checkbox" name="theme" id={themeId} className={cx('theme-input')} onChange={handleToggleDark} />
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
