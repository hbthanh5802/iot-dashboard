import classNames from 'classnames/bind';

import styles from './Mainbar.module.scss';
import images from '@/assets/images';
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
// import { MdSunny as LightMedium } from 'react-icons/md';
// import { IoPartlySunny as LightHigh } from 'react-icons/io5';

const cx = classNames.bind(styles);

function Mainbar() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('card', 'normal')}>
        <img className={cx('card-cirlce')} src={images.circleSvg} alt="circle" />
        <div className={cx('card-info')}>
          <h3 className={cx('card-header')}>Tempurature</h3>
          <p className={cx('card-number')}>
            8<span>°C</span>
          </p>
        </div>
        <div className={cx('card-icon')}>
          <span>
            <TemperatureNormal />
          </span>
        </div>
      </div>
      <div className={cx('card', 'semi-medium')}>
        <div className={cx('card-info')}>
          <h3 className={cx('card-header')}>Moisture</h3>
          <p className={cx('card-number')}>
            32<span>%</span>
          </p>
        </div>
        <div className={cx('card-icon')}>
          <span>
            <MoistureNormal />
          </span>
        </div>
      </div>
      <div className={cx('card', 'high')}>
        <div className={cx('card-info')}>
          <h3 className={cx('card-header')}>Light</h3>
          <p className={cx('card-number')}>
            8<span>Lux</span>
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

export default Mainbar;
