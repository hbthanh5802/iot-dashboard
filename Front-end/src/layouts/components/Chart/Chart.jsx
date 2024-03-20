import classNames from 'classnames/bind';
import { useCallback, useContext, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import styles from './Chart.module.scss';
import { ThemeContext } from '@/contexts/ThemeContext';
import * as timeHelper from '@/utils/time';
import SwitchButton from '@/components/SwitchButton';

const cx = classNames.bind(styles);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Chart({ socketClient }) {
  const { dark } = useContext(ThemeContext);
  const [chartLabel, setChartLabel] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [isSlideData, setIsSlide] = useState(() => {
    const slideData = localStorage.getItem('isSlideData') || false;
    return slideData && slideData === 'false' ? false : true;
  });

  const [chartData, setChartData] = useState({
    labels: chartLabel,
    datasets: [
      {
        label: 'Temperature',
        data: currentData.length > 0 ? currentData?.map((dataItem) => dataItem.temperature) : [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Moisture',
        data: currentData.length > 0 ? currentData?.map((dataItem) => dataItem.humidity) : [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Brightness',
        data: currentData.length > 0 ? currentData?.map((dataItem) => dataItem.brightness) : [],
        borderColor: 'rgb(242, 166, 84)',
        backgroundColor: 'rgba(242, 166, 84, 0.5)',
      },
    ],
  });

  useEffect(() => {
    const dataset = {
      labels: chartLabel,
      datasets: [
        {
          label: 'Temperature',
          data: currentData.length > 0 ? currentData?.map((dataItem) => +dataItem.temperature) : [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Moisture',
          data: currentData.length > 0 ? currentData?.map((dataItem) => +dataItem.humidity) : [],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Brightness',
          data: currentData.length > 0 ? currentData?.map((dataItem) => +dataItem.brightness) : [],
          borderColor: 'rgb(242, 166, 84)',
          backgroundColor: 'rgba(242, 166, 84, 0.5)',
        },
      ],
    };
    setChartData(dataset);
  }, [chartLabel, currentData]);

  // console.log('data', chartData);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'MCU ESP8266',
      },
    },
  };

  useEffect(() => {
    const slideData = localStorage.getItem('isSlideData') || false;
    setIsSlide(slideData && slideData === 'false' ? false : true);
  }, []);

  const handleChangeSlideData = useCallback((mode) => {
    localStorage.setItem('isSlideData', mode);
    setIsSlide(mode);
  }, []);

  useEffect(() => {
    socketClient?.on('sensorData', (data) => {
      const sensorData = JSON.parse(data);

      setChartLabel((prev) => [...prev, timeHelper.formatToCustomFormat(sensorData.createdAt, 'hh:mm:ss')]);
      setCurrentData((prev) => {
        const { createdAt, ...otherData } = sensorData;
        return [...prev, otherData];
      });
    });
  }, [socketClient]);

  useEffect(() => {
    if (isSlideData && chartLabel.length > 10) {
      setChartLabel([...chartLabel.slice(chartLabel.length - 10)]);
      setCurrentData([...currentData.slice(currentData.length - 10)]);
    }
  }, [isSlideData, currentData, chartLabel]);

  return (
    <div className={cx('wrapper', { dark })}>
      <div className={cx('slide-data-btn')}>
        <SwitchButton onClick={handleChangeSlideData} mode={isSlideData} title={'Click to slide the data in Chart'} />
      </div>
      <Line className={cx('chart')} options={options} data={chartData} />
    </div>
  );
}

export default Chart;
