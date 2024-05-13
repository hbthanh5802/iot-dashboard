/* eslint-disable no-useless-computed-key */
import { memo, useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
// import socketIOClient from 'socket.io-client';

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
import { MdSunny as LightHigh } from 'react-icons/md';
import { IoPartlySunny as LightMedium } from 'react-icons/io5';

const cx = classNames.bind(styles);

function WidgetBar({ socketClient }) {
  const { dark } = useContext(ThemeContext);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setMoisture] = useState(0);
  const [brightness, setBrightness] = useState(0);

  useEffect(() => {
    // const socket = socketIOClient(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });
    socketClient?.on('sensorData', (data) => {
      // console.log('Widget', data);
      const sensorData = JSON.parse(data);
      setTemperature(+sensorData?.temperature);
      setMoisture(+sensorData?.humidity);
      setBrightness(+sensorData?.brightness);
    });
    return () => {
      socketClient?.disconnect();
    };
  }, [socketClient]);

  return (
    <div className={cx('wrapper', { dark })}>
      <div
        className={cx('card', 'temperature', {
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
            {temperature < 33 ? <TemperatureNormal /> : temperature < 66 ? <TemperatureMedium /> : <TemperatureHigh />}
          </span>
        </div>
      </div>
      <div
        className={cx('card', 'humidity', {
          normal: 0 <= humidity && humidity < 25,
          ['semi-medium']: 25 <= humidity && humidity < 50,
          medium: 50 <= humidity && humidity < 75,
          high: 75 <= humidity,
        })}
      >
        <img className={cx('card-circle')} src={images.circleSvg} alt="circle" />
        <div className={cx('card-info')}>
          <h3 className={cx('card-header')}>Humidity</h3>
          <p className={cx('card-number')}>
            {humidity}
            <span>%</span>
          </p>
        </div>
        <div className={cx('card-icon')}>
          <span>{humidity < 33 ? <HumidityNormal /> : humidity < 66 ? <HumidityMedium /> : <HumidityHigh />}</span>
        </div>
      </div>
      <div
        className={cx('card', 'brightness', {
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
          <span>{brightness < 333 ? <LightNormal /> : brightness < 666 ? <LightMedium /> : <LightHigh />}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(WidgetBar);
