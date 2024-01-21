import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { TiHome } from 'react-icons/ti';
// import SwitchButton from '@/components/SwitchButton';

const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('title')}>
        <span className={cx('title-icon')}>
          <TiHome className={cx('icon')} />
        </span>
        Dashboard
      </h3>
      {/* <div className={cx('switch-theme')}>
        <SwitchButton className={cx('switch-btn')} />
      </div> */}
    </div>
  );
}

export default Header;
