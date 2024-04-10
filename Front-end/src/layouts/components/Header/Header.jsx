import { useContext, useEffect, useId, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import { Dropdown, Space, Tag, Tooltip } from 'antd';

import styles from './Header.module.scss';
import './DropdownMenu.scss';
import { TiHome } from 'react-icons/ti';
import { FaMoon } from 'react-icons/fa';
import { IoSunny } from 'react-icons/io5';
import { TbPhotoSensor3 } from 'react-icons/tb';
import { GrAction } from 'react-icons/gr';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { MdOutlineCancel } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { ThemeContext } from '@/contexts/ThemeContext';
import NavItem from './NavItem';

import mqttServices from '@/services/mqttServices';

// import SwitchButton from '@/components/SwitchButton';

const cx = classNames.bind(styles);

function Header() {
  const themeId = useId();
  const { dark, handleToggleDark } = useContext(ThemeContext);
  const [isMQTTConnected, setIsMQTTConnected] = useState(false);

  useEffect(() => {
    const checkStatusInterval = setInterval(() => {
      mqttServices
        .getStatus({ allowLog: false })
        .then((response) => {
          setIsMQTTConnected(response?.data?.isConnected);
        })
        .catch((error) => {
          console.log(error);
          setIsMQTTConnected(false);
        });
    }, 5000);
    return () => {
      clearInterval(checkStatusInterval);
    };
  });

  return (
    <div className={cx('wrapper', { dark })}>
      <Space>
        <Link to={'/'} className={cx('title')}>
          <span className={cx('title-icon')}>
            <TiHome className={cx('icon')} />
          </span>
          <span className={cx('title-text')}>Dashboard</span>
        </Link>
        <Tooltip title="MQTT" placement="bottomRight">
          <Tag
            className={cx('status-tag')}
            icon={
              isMQTTConnected ? (
                <FaRegCircleCheck className={cx('status-icon')} />
              ) : (
                <MdOutlineCancel className={cx('status-icon')} />
              )
            }
            color={isMQTTConnected ? 'success' : 'error'}
          >
            {isMQTTConnected ? 'CONNECTED' : 'DISCONNECTED'}
          </Tag>
        </Tooltip>
      </Space>

      <nav className={cx('nav')}>
        <Space size={'small'}>
          <NavItem
            leftIcon={<TbPhotoSensor3 />}
            className={cx('nav-link')}
            title={'Sensor Data'}
            to={'/history/sensors'}
          />
          <NavItem
            leftIcon={<GrAction />}
            className={cx('nav-link')}
            title={'Action History'}
            to={'/history/actions'}
          />
          <NavItem leftIcon={<FaRegUser />} className={cx('nav-link')} title={'Profile'} to={'/profile'} />
        </Space>
      </nav>

      <div className={cx('theme-wrapper')}>
        <label htmlFor={themeId} className={cx('theme-label')}>
          <input
            type="checkbox"
            name="theme"
            id={themeId}
            className={cx('theme-input')}
            onChange={handleToggleDark}
            checked={dark}
          />
          <span className={cx('theme-icon', 'moon-icon')}>
            <FaMoon />
          </span>
          <span className={cx('theme-icon', 'sun-icon')}>
            <IoSunny />
          </span>
          <span className={cx('toggle')}></span>
        </label>
      </div>
    </div>
  );
}

export default Header;
