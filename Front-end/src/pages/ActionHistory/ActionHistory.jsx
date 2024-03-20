import { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';

import styles from './ActionHistory.module.scss';
import CustomTable from '@/components/CustomTable';
import deviceServices from '@/services/deviceServices';

import { Tag } from 'antd';

const cx = classNames.bind(styles);

const columns = [
  {
    key: 'id',
    title: 'STT',
    dataIndex: 'id',
    width: '100px',
  },
  {
    key: 'action',
    title: 'Action',
    dataIndex: 'action',
    render: (_, { action }) => <>{<Tag color={action === 'ON' ? 'green' : 'red'}>{action}</Tag>}</>,
  },
  {
    key: 'createdAt',
    title: 'Created At',
    dataIndex: 'createdAt',
  },
  {
    key: 'deviceId',
    title: 'DeviceID',
    dataIndex: 'deviceId',
  },
];

function SensorsHistory() {
  const [loading, setLoading] = useState(false);
  const [actionData, setActionData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    orderBy: 'createdAt',
    direction: 'DESC',
  });
  // Action filter
  const handleChangeFilter = useCallback(
    (action) => {
      if (action) {
        setFilters((prev) => ({ ...prev, action }));
      } else {
        const { action, ...otherFilters } = filters;
        setFilters({ ...otherFilters });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(filters)],
  );

  useEffect(() => {
    const fetchSensorData = async () => {
      let response;
      try {
        setLoading(true);
        response = await deviceServices.getDataAction({ params: filters });
        const dataAction = response.data.map((dataItem, index) => ({ ...dataItem, key: dataItem.id }));
        setActionData(dataAction);
        setPagination(response?.meta?.pagination);
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSensorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  const handlePageChange = useCallback((currentPage) => {
    setFilters({ ...currentPage });
  }, []);

  return (
    <div className={cx('wrapper')}>
      <CustomTable
        loading={loading}
        title={'Actions History'}
        data={actionData}
        columns={columns}
        paginationData={pagination}
        handlePageChange={handlePageChange}
        filterData={filters}
        handleChangeFilter={handleChangeFilter}
      />
    </div>
  );
}

export default SensorsHistory;
