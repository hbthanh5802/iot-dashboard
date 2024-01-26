import classNames from 'classnames/bind';
import { useContext } from 'react';

import styles from './DefaultLayout.module.scss';
import Header from '@/layouts/components/Header';
import { ThemeContext } from '@/contexts/ThemeContext';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const { dark } = useContext(ThemeContext);

  return (
    <div
      className={cx('wrapper', {
        dark: dark,
      })}
    >
      <Header />
      <div className={cx('container')}>{children}</div>
    </div>
  );
}

export default DefaultLayout;
