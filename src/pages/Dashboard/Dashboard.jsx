import classNames from 'classnames/bind';

import styles from './Dashboard.module.scss';
import Mainbar from '@/layouts/components/Mainbar';
import Sidebar from '@/layouts/components/Sidebar';
import Chart from '@/layouts/components/Chart';

const cx = classNames.bind(styles);

function Dashboard() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <Mainbar />
        <Chart />
      </div>
      <Sidebar />
    </div>
  );
}

export default Dashboard;
