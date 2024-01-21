import { useCallback, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import SwitchButton from '@/components/SwitchButton';
import { PiFanFill } from 'react-icons/pi';

const cx = classNames.bind(styles);

function Sidebar() {
  const [isFanOn, setIsFanOn] = useState(false);

  const handleFanClick = useCallback((mode) => {
    setIsFanOn(mode);
  }, []);

  const [spin, spinApi] = useSpring(() => ({
    loop: true,
    from: { transform: 'rotate(-0deg)' },
    to: { transform: 'rotate(360deg)' },
    config: {
      duration: 1000,
    },
  }));

  useEffect(() => {
    console.log(spin);
    if (spinApi) {
      isFanOn ? spinApi.resume() : spinApi.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFanOn]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('device-info')}>
        <h3>Devices</h3>
        <div className={cx('device-desc')}>
          <strong>Name:</strong>
          <p>ABC</p>
        </div>
        <div className={cx('device-desc')}>
          <strong>Name:</strong>
          <p>ABC</p>
        </div>
        <div className={cx('device-desc')}>
          <strong>Name:</strong>
          <p>ABC</p>
        </div>
      </div>
      <div className={cx('device-controls')}>
        <div className={cx('control')}>
          <span className={cx('control-icon')}>
            <animated.div style={{ ...spin }}>
              <PiFanFill />
            </animated.div>
          </span>
          <SwitchButton mode={isFanOn} onFanClick={handleFanClick} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
