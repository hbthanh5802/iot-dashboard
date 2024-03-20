import classNames from 'classnames/bind';
import { useContext } from 'react';

import styles from './SwitchButton.module.scss';
import { ThemeContext } from '@/contexts/ThemeContext';
import { Tooltip } from 'antd';

const cx = classNames.bind(styles);

function SwitchButton({ mode, onClick, title }) {
  const { dark } = useContext(ThemeContext);
  return (
    <div className={cx('wrapper', { dark })} onClick={() => onClick(!mode, true)}>
      <Tooltip title={title} placement="leftTop">
        <div className={cx('switch-btn')}>
          <input type="checkbox" checked={mode} readOnly />
          <div className={cx('knobs')}></div>
          <div className={cx('layer')}></div>
        </div>
      </Tooltip>
    </div>
  );
}

export default SwitchButton;
