import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import styles from './Dashboard.module.scss';

import WidgetBar from '@/layouts/components/WidgetBar';
import Sidebar from '@/layouts/components/Sidebar';
import Chart from '@/layouts/components/Chart';

const cx = classNames.bind(styles);

function Dashboard() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketClient = io('http://localhost:4004', { transports: ['websocket', 'polling', 'flashsocket'] });
    setSocket(socketClient);
    return () => {
      socketClient.disconnect();
    };
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <WidgetBar socketClient={socket} />
        <Chart socketClient={socket} />
      </div>
      <Sidebar />
    </div>
  );
}

export default Dashboard;
