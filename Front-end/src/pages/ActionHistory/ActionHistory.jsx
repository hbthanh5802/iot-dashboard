import { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';

import { message } from 'antd';

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
    sorter: true,
  },
  {
    key: 'deviceName',
    title: 'Device Name',
    dataIndex: 'deviceName',
  },
  // {
  //   key: 'deviceId',
  //   title: 'DeviceID',
  //   dataIndex: 'deviceId',
  // },
];

function SensorsHistory() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [actionData, setActionData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    orderBy: 'createdAt',
    direction: 'DESC',
  });
  // Action filter
  const handleChangeActionFilter = useCallback(
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
  const [deleteList, setDeleteList] = useState([]);
  const handleDeleteChange = useCallback((idList) => {
    setDeleteList(idList);
  }, []);
  const handleDeleteDataSensor = useCallback(async () => {
    if (deleteList.length === 0) {
      messageApi.info('NONE selected sensor data!');
      return;
    }
    const params = {
      dataId: deleteList?.join(','),
    };
    messageApi.loading('Deleting...', [0.25]);
    await deviceServices
      .deleteActionData({ params, allowLog: true })
      .then((response) => {
        if (response?.statusCode === 200) {
          messageApi.success('SUCCEED to DELETE selected action data');
          setFilters({ ...filters, refresh: Math.random() * 100 });
        }
      })
      .catch((error) => {
        messageApi.error('FAILED to DELETE selected action data!');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteList, messageApi]);

  useEffect(() => {
    const fetchSensorData = async () => {
      let response;
      try {
        setLoading(true);
        response = await deviceServices.getDataAction({ params: { ...filters, withDeviceRef: true }, allowLog: true });
        const dataAction = response.data.map((dataItem, index) => ({
          ...dataItem,
          key: dataItem.id,
          deviceName: dataItem?.device?.name,
        }));
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
    <>
      {contextHolder}
      <div className={cx('wrapper')}>
        <CustomTable
          loading={loading}
          title={'Actions History'}
          data={actionData}
          columns={columns}
          paginationData={pagination}
          handlePageChange={handlePageChange}
          filterData={filters}
          deleteList={deleteList}
          handleChangeActionFilter={handleChangeActionFilter}
          handleDeleteChange={handleDeleteChange}
          handleDeleteDataSensor={handleDeleteDataSensor}
        />
      </div>
    </>
  );
}

export default SensorsHistory;
