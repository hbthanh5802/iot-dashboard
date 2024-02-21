import classNames from 'classnames/bind';
import { useContext, useEffect, useRef } from 'react';

import styles from './DefaultLayout.module.scss';
import Header from '@/layouts/components/Header';
import { ThemeContext } from '@/contexts/ThemeContext';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const { dark } = useContext(ThemeContext);
  const layoutRef = useRef(null);
  const location = useLocation().pathname;

  return (
    <div
      className={cx('wrapper', {
        dark: dark,
      })}
    >
      <Header />
      <div
        ref={layoutRef}
        className={cx('container', {
          noHeight: location === '/profile',
        })}
      >
        {children}
      </div>
    </div>
  );
}

export default DefaultLayout;
