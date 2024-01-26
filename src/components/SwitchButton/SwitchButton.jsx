import classNames from 'classnames/bind';

import styles from './SwitchButton.module.scss';

const cx = classNames.bind(styles);

function SwitchButton({ mode, onClick }) {
  return (
    <div className={cx('wrapper')} onClick={() => onClick(!mode)}>
      <div className={cx('switch-btn')}>
        <input type="checkbox" />
        <div className={cx('knobs')}></div>
        <div className={cx('layer')}></div>
      </div>
    </div>
  );
}

export default SwitchButton;
