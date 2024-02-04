import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './ActionHistory.module.scss';
import CustomTable from '@/components/CustomTable';

const cx = classNames.bind(styles);

function randomDate(start, end) {
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  const randomDate = new Date(randomTime);
  return randomDate;
}
const startDate = new Date('2020-01-01');
const endDate = new Date('2024-01-01');
const columns = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    filters: [
      {
        text: '1',
        value: '1',
      },
      {
        text: '2',
        value: '2',
      },
    ],
    onFilter: (value, record) => record.id === value,
    filterSearch: true,
    width: '100px',
  },
  {
    key: 'temperature',
    title: 'Temperature',
    dataIndex: 'temperature',
    sorter: (a, b) => a.temperature - b.temperature,
  },
  {
    key: 'moisture',
    title: 'Moisture',
    dataIndex: 'moisture',
    sorter: (a, b) => a.temperature - b.temperature,
  },
  {
    key: 'brightness',
    title: 'Brightness',
    dataIndex: 'brightness',
    sorter: (a, b) => a.temperature - b.temperature,
  },
  {
    key: 'createdAt',
    title: 'Created At',
    dataIndex: 'createdAt',
    defaultSortOrder: 'descend',
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  },
  {
    key: 'sensorId',
    title: 'SensorID',
    dataIndex: 'sensorId',
    filters: [
      {
        text: '1',
        value: '1',
      },
      {
        text: '2',
        value: '2',
      },
    ],
    onFilter: (value, record) => record.sensorId === value,
    filterSearch: true,
  },
];
const randomData = [];
for (let i = 1; i <= 100; i++) {
  randomData.push({
    key: `${i}`,
    id: `${i}`,
    temperature: Math.floor(Math.random() * 100 + 1),
    moisture: Math.floor(Math.random() * 100 + 1),
    brightness: Math.floor(Math.random() * 100 + 1),
    createdAt: randomDate(startDate, endDate).toUTCString(),
    sensorId: Math.floor(Math.random() * 4 + 1),
  });
}

function SensorsHistory() {
  const tableRef = useRef();

  useEffect(() => {
    // console.log(tableRef.current);
  }, []);

  return (
    <div className={cx('wrapper')}>
      <CustomTable ref={tableRef} title={'Actions'} data={randomData} columns={columns} />
    </div>
  );
}

export default SensorsHistory;
