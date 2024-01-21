import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('device-info')}>
        <h3>Devices</h3>
        <p className={cx('device-desc')}>
          <span>Name:</span>
          <p>ABC</p>
        </p>
        <p className={cx('device-desc')}>
          <span>Name:</span>
          <p>ABC</p>
        </p>
        <p className={cx('device-desc')}>
          <span>Name:</span>
          <p>ABC</p>
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
