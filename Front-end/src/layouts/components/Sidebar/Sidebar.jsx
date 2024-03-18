import { useCallback, useContext, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import SwitchButton from '@/components/SwitchButton';
import { PiFanFill } from 'react-icons/pi';
import { HiOutlineLightBulb } from 'react-icons/hi2';
import { HiLightBulb } from 'react-icons/hi2';
import { ThemeContext } from '@/contexts/ThemeContext';
import { message } from 'antd';
import deviceServices from '@/services/deviceServices';

const cx = classNames.bind(styles);

function Sidebar() {
  const { dark } = useContext(ThemeContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [isFanOn, setIsFanOn] = useState(false);
  const [isLightOn, setIsLightOn] = useState(false);

  const handleFanClick = useCallback(
    (mode) => {
      const data = {
        deviceId: 'D1',
        action: mode,
      };
      messageApi.loading(`Waiting...`, [0.5]);
      deviceServices
        .updateDeviceStatus({ data })
        .then((response) => {
          console.log('response', response);
          messageApi.success(`Succeed to ${!mode ? 'TURN OFF' : 'TURN ON'} THE FAN`);
          setIsFanOn(mode);
        })
        .catch((error) => {
          console.log('error', error);
          messageApi.error(`Failed to ${!mode ? 'TURN OFF' : 'TURN ON'} THE FAN`);
          setIsFanOn(!mode);
        });
    },
    [messageApi],
  );

  const handleLightClick = useCallback(
    (mode) => {
      const data = {
        deviceId: 'D2',
        action: mode,
      };
      deviceServices
        .updateDeviceStatus({ data })
        .then((response) => {
          console.log('response', response);
          messageApi.success(`Succeed to ${!mode ? 'TURN OFF' : 'TURN ON'} THE LIGHT`);
          setIsLightOn(mode);
        })
        .catch((error) => {
          console.log('error', error);
          messageApi.error(`Failed to ${!mode ? 'TURN OFF' : 'TURN ON'} THE LIGHT`);
          setIsFanOn(!mode);
        });
    },
    [messageApi],
  );

  const [spin, spinApi] = useSpring(() => ({
    loop: true,
    from: { transform: 'rotate(-0deg)' },
    to: { transform: 'rotate(360deg)' },
    config: {
      duration: 1000,
    },
  }));

  useEffect(() => {
    if (spinApi) {
      isFanOn ? spinApi.resume() : spinApi.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFanOn]);

  return (
    <>
      {contextHolder}
      <div className={cx('wrapper', { dark })}>
        <div className={cx('device-info')}>
          <h3>Devices</h3>
          <div className={cx('device-desc')}>
            <strong>Name:</strong>
            <p>NodeMCU ESP8266</p>
          </div>
          <div className={cx('device-desc')}>
            <strong>CPU:</strong>
            <p>CPU RISC 32-bit Tensilica Xtensa LX106</p>
          </div>
          <div className={cx('device-desc')}>
            <strong>Operating voltage:</strong>
            <p>3.3V</p>
          </div>
          <div className={cx('device-desc')}>
            <strong>Input voltage:</strong>
            <p>7-12V</p>
          </div>
          <div className={cx('device-desc')}>
            <strong>Digital I/O pins (DIO):</strong>
            <p>16</p>
          </div>
          <div className={cx('device-desc')}>
            <strong>Analog input pins (ADC):</strong>
            <p>1</p>
          </div>
          <div className={cx('device-desc')}>
            <strong>UARTs:</strong>
            <p>1</p>
          </div>
          <div className={cx('device-desc')}>
            <strong>SPI:</strong>
            <p>1</p>
          </div>
          <div className={cx('device-desc')}>
            <strong>12Cs:</strong>
            <p>1</p>
          </div>
          <div className={cx('device-desc')}>
            <strong>Flash memory:</strong>
            <p>4 MB</p>
          </div>
          <div className={cx('device-desc')}>
            <strong>SRAM:</strong>
            <p>64 KB</p>
          </div>
          <div className={cx('device-desc')}>
            <strong>Clock speed:</strong>
            <p>80 MHz</p>
          </div>
        </div>
        <div className={cx('device-controls')}>
          <div className={cx('control')}>
            <span className={cx('control-icon')}>
              <animated.div style={{ ...spin }}>
                <PiFanFill />
              </animated.div>
            </span>
            <div className={cx('control-btn')}>
              <SwitchButton mode={isFanOn} onClick={handleFanClick} />
            </div>
          </div>
          <div className={cx('control')}>
            <span className={cx('control-icon')}>
              {isLightOn ? (
                <span className={cx('yellow-light')}>
                  <HiLightBulb />
                </span>
              ) : (
                <HiOutlineLightBulb />
              )}
            </span>
            <div className={cx('control-btn')}>
              <SwitchButton mode={isLightOn} onClick={handleLightClick} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
