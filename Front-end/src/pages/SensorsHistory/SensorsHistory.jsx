import { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';

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
  },
  {
    key: 'humidity',
    title: 'Humidity (%)',
    dataIndex: 'humidity',
  },
  {
    key: 'brightness',
    title: 'Brightness (Lux)',
    dataIndex: 'brightness',
  },
  {
    key: 'createdAt',
    title: 'Created At',
    dataIndex: 'createdAt',
  },
  {
    key: 'sensorId',
    title: 'SensorID',
    dataIndex: 'sensorId',
  },
];

function SensorsHistory() {
  const [loading, setLoading] = useState(false);
  const [sensorData, setSensorData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    orderBy: 'createdAt',
    direction: 'DESC',
  });

  useEffect(() => {
    const fetchSensorData = async () => {
      let response;
      try {
        setLoading(true);
        response = await sensorServices.getSensorData({ params: filters });
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
    <div className={cx('wrapper')}>
      <CustomTable
        loading={loading}
        title={'Sensors History'}
        data={sensorData}
        columns={columns}
        paginationData={pagination}
        handlePageChange={handlePageChange}
        filterData={filters}
      />
    </div>
  );
}

export default SensorsHistory;
