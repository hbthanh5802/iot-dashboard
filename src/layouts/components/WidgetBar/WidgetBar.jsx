/* eslint-disable no-useless-computed-key */
import classNames from 'classnames/bind';

import styles from './WidgetBar.module.scss';
import images from '@/assets/images';
import { ThemeContext } from '@/contexts/ThemeContext';
// Temperature
import { FaTemperatureEmpty as TemperatureNormal } from 'react-icons/fa6';
// import { FaTemperatureHalf as TemperatureMedium } from 'react-icons/fa6';
// import { FaTemperatureFull as TemperatureHigh } from 'react-icons/fa6';
// Moisture
import { TbWashTemperature1 as MoistureNormal } from 'react-icons/tb';
// import { TbWashTemperature3 as MoistureMedium } from 'react-icons/tb';
// import { TbWashTemperature6 as MoistureHigh } from 'react-icons/tb';
// Light
import { FaCloud as LightNormal } from 'react-icons/fa6';
import { useContext, useState } from 'react';
// import { MdSunny as LightMedium } from 'react-icons/md';
// import { IoPartlySunny as LightHigh } from 'react-icons/io5';

const cx = classNames.bind(styles);

function WidgetBar() {
  const { dark } = useContext(ThemeContext);
  const [temperature, setTemperature] = useState(32);
  const [moisture, setMoisture] = useState(8);
  const [brightness, setBrightness] = useState(109);

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
          normal: 0 <= moisture && moisture < 25,
          ['semi-medium']: 25 <= moisture && moisture < 50,
          medium: 50 <= moisture && moisture < 75,
          high: 75 <= moisture,
        })}
      >
        <img className={cx('card-circle')} src={images.circleSvg} alt="circle" />
        <div className={cx('card-info')}>
          <h3 className={cx('card-header')}>Moisture</h3>
          <p className={cx('card-number')}>
            {moisture}
            <span>%</span>
          </p>
        </div>
        <div className={cx('card-icon')}>
          <span>
            <MoistureNormal />
          </span>
        </div>
      </div>
      <div
        className={cx('card', {
          normal: 0 <= brightness && brightness < 25,
          ['semi-medium']: 25 <= brightness && brightness < 50,
          medium: 50 <= brightness && brightness < 75,
          high: 75 <= brightness,
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
