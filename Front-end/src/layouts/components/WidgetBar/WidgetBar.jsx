/* eslint-disable no-useless-computed-key */
import classNames from 'classnames/bind';
import socketIOClient from 'socket.io-client';

import styles from './WidgetBar.module.scss';
import images from '@/assets/images';
import { ThemeContext } from '@/contexts/ThemeContext';
// Temperature
import { FaTemperatureEmpty as TemperatureNormal } from 'react-icons/fa6';
import { FaTemperatureHalf as TemperatureMedium } from 'react-icons/fa6';
import { FaTemperatureFull as TemperatureHigh } from 'react-icons/fa6';
// Humidity
import { TbWashTemperature1 as HumidityNormal } from 'react-icons/tb';
import { TbWashTemperature3 as HumidityMedium } from 'react-icons/tb';
import { TbWashTemperature6 as HumidityHigh } from 'react-icons/tb';
// Light
import { FaCloud as LightNormal } from 'react-icons/fa6';
import { useContext, useEffect, useState } from 'react';
import { MdSunny as LightMedium } from 'react-icons/md';
import { IoPartlySunny as LightHigh } from 'react-icons/io5';

const cx = classNames.bind(styles);
const ENDPOINT = `http://localhost:4004`; // Địa chỉ của server socket

function WidgetBar() {
  const { dark } = useContext(ThemeContext);
  const [temperature, setTemperature] = useState(32);
  const [humidity, setMoisture] = useState(8);
  const [brightness, setBrightness] = useState(109);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });
    socket.on('sensorData', (data) => {
      // console.log(JSON.parse(data));
      const sensorData = JSON.parse(data);
      setTemperature(+sensorData?.temperature);
      setMoisture(+sensorData?.humidity);
      setBrightness(+sensorData?.brightness);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className={cx('wrapper', { dark })}>
      <div
        className={cx('card', {
          normal: 0 <= temperature && temperature < 25,
          ['semi-medium']: 25 <= temperature && temperature < 50,
          medium: 50 <= temperature && temperature < 75,
          high: 75 <= temperature,
        })}
      >
        <img className={cx('card-circle')} src={images.circleSvg} alt="circle" />
        <div className={cx('card-info')}>
          <h3 className={cx('card-header')}>Temperature</h3>
          <p className={cx('card-number')}>
            {temperature}
            <span>°C</span>
          </p>
        </div>
        <div className={cx('card-icon')}>
          <span>
            <TemperatureNormal />
          </span>
        </div>
      </div>
      <div
        className={cx('card', {
          normal: 0 <= humidity && humidity < 25,
          ['semi-medium']: 25 <= humidity && humidity < 50,
          medium: 50 <= humidity && humidity < 75,
          high: 75 <= humidity,
        })}
      >
        <img className={cx('card-circle')} src={images.circleSvg} alt="circle" />
        <div className={cx('card-info')}>
          <h3 className={cx('card-header')}>Moisture</h3>
          <p className={cx('card-number')}>
            {humidity}
            <span>%</span>
          </p>
        </div>
        <div className={cx('card-icon')}>
          <span>
            <HumidityNormal />
          </span>
        </div>
      </div>
      <div
        className={cx('card', {
          normal: 0 <= brightness && brightness < 200,
          ['semi-medium']: 200 <= brightness && brightness < 400,
          medium: 400 <= brightness && brightness < 600,
          high: 600 <= brightness,
        })}
      >
        <img className={cx('card-circle')} src={images.circleSvg} alt="circle" />
        <div className={cx('card-info')}>
          <h3 className={cx('card-header')}>Brightness</h3>
          <p className={cx('card-number')}>
            {brightness}
            <span>Lux</span>
          </p>
        </div>
        <div className={cx('card-icon')}>
          <span>
            <LightNormal />
          </span>
        </div>
      </div>
    </div>
  );
}

export default WidgetBar;
