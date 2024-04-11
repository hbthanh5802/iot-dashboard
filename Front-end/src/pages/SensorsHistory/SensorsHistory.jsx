import { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';

import { message } from 'antd';

import styles from './SensorsHistory.module.scss';
import CustomTable from '@/components/CustomTable';
import sensorServices from '@/services/sensorServices';

const cx = classNames.bind(styles);

const columns = [
  {
    key: 'id',
    title: 'STT',
    dataIndex: 'id',
    width: '100px',
  },
  {
    key: 'temperature',
    title: 'Temperature (°C)',
    dataIndex: 'temperature',
    sorter: true,
  },
  {
    key: 'humidity',
    title: 'Humidity (%)',
    dataIndex: 'humidity',
    sorter: true,
  },
  {
    key: 'brightness',
    title: 'Brightness (Lux)',
    dataIndex: 'brightness',
    sorter: true,
  },
  {
    key: 'createdAt',
    title: 'Created At',
    dataIndex: 'createdAt',
    sorter: true,
  },
  {
    key: 'sensorId',
    title: 'SensorID',
    dataIndex: 'sensorId',
  },
];

function SensorsHistory() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [sensorData, setSensorData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    orderBy: 'createdAt',
    direction: 'DESC',
  });
  // Other filter
  const [deleteList, setDeleteList] = useState([]);
  const [search, setSearch] = useState({
    searchField: '',
    searchValue: '',
    searchOperator: 'equal',
  });

  const handleDeleteChange = useCallback((idList) => setDeleteList(idList), []);
  const handleDeleteDataSensor = useCallback(async () => {
    if (deleteList.length === 0) {
      messageApi.info('NONE selected sensor data!');
      return;
    }
    const params = {
      dataId: deleteList?.join(','),
    };
    messageApi.loading('Deleting...', [0.25]);
    await sensorServices
      .deleteSensorData({ params, allowLog: true })
      .then((response) => {
        if (response?.statusCode === 200) {
          messageApi.success('SUCCEED to DELETE selected sensor data');
          setFilters({ ...filters, refresh: Math.random() * 100 });
        }
      })
      .catch((error) => {
        messageApi.error('FAILED to DELETE selected sensor data!');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteList, messageApi]);

  const handleSearchChange = useCallback((data) => {
    const { searchField, searchValue, searchOperator } = data;
    setSearch((prev) => ({ ...prev, searchField, searchValue, searchOperator }));
  }, []);

  useEffect(() => {
    const fetchSensorData = async () => {
      let response;
      try {
        setLoading(true);
        response = await sensorServices.getSensorData({ params: filters, allowLog: true });
        const dataSensor = response.data.map((dataItem, index) => ({ ...dataItem, key: index }));
        setSensorData(dataSensor);
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

  // console.log('filters', filters);

  const handlePageChange = useCallback((currentPage) => {
    setFilters({ ...currentPage });
  }, []);

  return (
    <>
      {contextHolder}
      <div className={cx('wrapper')}>
        <CustomTable
          loading={loading}
          title={'Sensors History'}
          data={sensorData}
          columns={columns}
          paginationData={pagination}
          handlePageChange={handlePageChange}
          filterData={filters}
          searchData={search}
          handleSearchChange={handleSearchChange}
          handleDeleteChange={handleDeleteChange}
          handleDeleteDataSensor={handleDeleteDataSensor}
        />
      </div>
    </>
  );
}

export default SensorsHistory;
