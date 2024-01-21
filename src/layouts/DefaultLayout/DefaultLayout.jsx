import classNames from 'classnames/bind';

import Header from '@/layouts/components/Header';
import Sidebar from '@/layouts/components/Sidebar';
import Mainbar from '@/layouts/components/Mainbar';

import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function Layout() {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        <div className={cx('content')}>
          <Mainbar />
          <div className={cx('chart-wrapper')}>
            <h1>ABC</h1>
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}

export default Layout;
