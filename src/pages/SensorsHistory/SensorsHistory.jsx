import { useContext } from 'react';
import classNames from 'classnames/bind';
import { ConfigProvider, Table } from 'antd';

import styles from './SensorsHistory.module.scss';
import { ThemeContext } from '@/contexts/ThemeContext';

const cx = classNames.bind(styles);

function randomDate(start, end) {
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  const randomDate = new Date(randomTime);
  return randomDate;
}
const startDate = new Date('2020-01-01');
const endDate = new Date('2024-01-01');

function SensorsHistory() {
  const { dark } = useContext(ThemeContext);
  const columns = [
    {
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
    },
    {
      title: 'Temperature',
      dataIndex: 'temperature',
      sorter: (a, b) => a.temperature - b.temperature,
    },
    {
      title: 'Moisture',
      dataIndex: 'moisture',
      sorter: (a, b) => a.temperature - b.temperature,
    },
    {
      title: 'Brightness',
      dataIndex: 'brightness',
      sorter: (a, b) => a.temperature - b.temperature,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
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
  const lightTheme = {
    token: {
      colorPrimary: '#096dd9',
    },
    components: {
      Table: {
        rowHoverBg: '#f0f5ff',
        headerBg: '#d6e4ff',
        footerBg: '#f0f5ff',
        bodySortBg: '#f0f5ff',
        headerSortHoverBg: '#f0f5ff',
        headerSortActiveBg: '#adc6ff',
      },
    },
  };

  const darkTheme = {
    token: {
      colorPrimary: '#9254de',
    },
    components: {
      Table: {
        rowHoverBg: 'rgba(110, 17, 217, 0.1)',
        headerBg: '#232227',
        footerBg: '#f0f5ff',
        bodySortBg: 'rgba(110, 17, 217, 0.1)',
        headerSortHoverBg: 'rgba(110, 17, 217, 0.1)',
        headerSortActiveBg: 'rgba(110, 17, 217, 0.2)',
        colorBgContainer: '#232227',
        borderColor: 'rgba(var(--secondary-rgb), 0.6)',
        colorText: 'var(--gray-400)',
        colorTextHeading: 'var(--gray-300)',
        headerFilterHoverBg: 'var(--gray)',
        headerSplitColor: 'var(--gray)',
        colorIcon: '#adb5bd',
        filterDropdownBg: 'var(--gray)',
        filterDropdownMenuBg: 'var(--gray)',
      },
      Pagination: {
        itemBg: 'var(--bg-box-dark)',
        itemActiveBg: '#432f66',
        colorText: 'var(--primary) !important',
      },
      Input: {
        colorBgContainer: 'var(--gray-light)',
        colorBorder: 'var(--gray)',
        colorText: '#000',
      },
      Dropdown: {
        controlItemBgActive: 'var(--gray-800)',
        controlItemBgHover: 'var(--gray-600)',
        controlItemBgActiveHover: 'var(--gray-600)',
        colorBgTextActive: 'red',
      },
      Checkbox: {
        colorBgContainer: 'var(--gray)',
      },
      Select: {
        colorBorder: 'var(--primary) !important',
        colorText: 'var(--gray-lighter)',
        controlItemBgActive: 'var(--gray)',
        selectorBg: 'var(--gray)',
        optionSelectedBg: 'var(--gray)',
        controlItemBgHover: 'var(--gray-500)',
      },
    },
  };
  return (
    <div className={cx('wrapper', { dark })}>
      <ConfigProvider
        // theme={{
        //   token: {
        //     colorPrimary: '#9254de',
        //   },
        //   components: {
        //     Pagination: {
        //       itemBg: 'var(--bg-box-dark)',
        //       itemActiveBg: '#432f66',
        //       colorText: 'var(--primary) !important',
        //     },
        //     Input: {
        //       colorBgContainer: 'var(--gray-light)',
        //       colorBorder: 'var(--gray)',
        //       colorText: '#000',
        //     },
        //     Dropdown: {
        //       controlItemBgActive: 'var(--gray-800)',
        //       controlItemBgHover: 'var(--gray-600)',
        //       controlItemBgActiveHover: 'var(--gray-600)',
        //       colorBgTextActive: 'red',
        //     },
        //     Checkbox: {
        //       colorBgContainer: 'var(--gray)',
        //     },
        //     Select: {
        //       colorBorder: 'var(--primary) !important',
        //       colorText: 'var(--gray-lighter)',
        //       controlItemBgActive: 'var(--gray)',
        //       selectorBg: 'var(--gray)',
        //       optionSelectedBg: 'var(--gray)',
        //       controlItemBgHover: 'var(--gray-500)',
        //     },
        //   },
        // }}
        theme={dark ? darkTheme : lightTheme}
      >
        <Table
          className={cx('table')}
          dataSource={randomData}
          columns={columns}
          pagination={{
            pageSize: 10,
            total: 100,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          // onChange={(pagination, filters, sorter, extra) => {
          //   console.log('params', pagination, filters, sorter, extra);
          // }}
        />
      </ConfigProvider>
    </div>
  );
}

export default SensorsHistory;
