import { useState } from 'react';
import classNames from 'classnames/bind';
import moment from 'moment';

import styles from './ActionHistory.module.scss';
import CustomTable from '@/components/CustomTable';
import { DatePicker, Button, Space } from 'antd';
import * as time from '@/utils/time';
import { FaFilter } from 'react-icons/fa';

const cx = classNames.bind(styles);

const startDate = new Date('2020-01-01');
const endDate = new Date('2024-01-01');

const randomData = [];
for (let i = 1; i <= 100; i++) {
  randomData.push({
    key: `${i}`,
    id: `${i}`,
    temperature: Math.floor(Math.random() * 100 + 1),
    moisture: Math.floor(Math.random() * 100 + 1),
    brightness: Math.floor(Math.random() * 100 + 1),
    createdAt: time.getRandomDate(startDate, endDate),
    sensorId: Math.floor(Math.random() * 4 + 1),
  });
}

function SensorsHistory() {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const handleSearch = (selectedKeys, confirm) => {
    confirm();
  };
  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    confirm();
  };
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
      filterIcon: <FaFilter />,
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
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => {
        return (
          <div
            style={{
              padding: 8,
            }}
          >
            <DatePicker.RangePicker
              value={selectedStartDate ? [selectedStartDate, selectedEndDate] : []}
              onChange={(dates, dateStrings) => {
                setSelectedKeys(dates);
                setSelectedStartDate(dates ? dates[0] : null);
                setSelectedEndDate(dates ? dates[1] : null);
              }}
              onPressEnter={() => handleSearch(selectedKeys, confirm)}
              // needConfirm
              placeholder={['Start Date', 'Till Now']}
              allowEmpty={[false, true]}
              placement="bottomRight"
              style={{
                marginBottom: 8,
                display: 'block',
              }}
              onReset={() => handleReset(clearFilters, confirm)}
            />
            <Space>
              <Button type="primary" onClick={() => handleSearch(selectedKeys, confirm)}>
                Search
              </Button>
              <Button type="text" onClick={() => handleReset(clearFilters, confirm)}>
                Reset
              </Button>
            </Space>
          </div>
        );
      },
      onFilter: (value, record) => {
        if (selectedStartDate) {
          const format = 'yyyy-MM-DD';
          const date = time.formatToCustomFormat(record.createdAt, format);
          const startDate = time.formatToCustomFormat(selectedStartDate, format);
          const endDate = time.formatToCustomFormat(selectedEndDate || moment(), format);
          return moment(date).isBetween(startDate, endDate, [format], '[]');
        }
        return true;
      },
      filterIcon: <FaFilter />,
      render: (value) => {
        return `${time.formatToCustomFormat(value, 'dddd, DD/MM/yyyy HH:mm:ss')}`;
      },
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
      filterIcon: <FaFilter />,
      filterSearch: true,
    },
  ];
  return (
    <div className={cx('wrapper')}>
      <CustomTable title={'Actions History'} data={randomData} columns={columns} />
    </div>
  );
}

export default SensorsHistory;
