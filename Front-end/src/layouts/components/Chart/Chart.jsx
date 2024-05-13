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
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { message } from 'antd';

import styles from './Chart.module.scss';
import { ThemeContext } from '@/contexts/ThemeContext';
import * as timeHelper from '@/utils/time';
import SwitchButton from '@/components/SwitchButton';

const cx = classNames.bind(styles);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function Chart({ socketClient }) {
  const { dark } = useContext(ThemeContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [chartLabel, setChartLabel] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [isSlideData, setIsSlide] = useState(() => {
    const slideData = localStorage.getItem('isSlideData') || false;
    return slideData && slideData === 'false' ? false : true;
  });

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'MCU ESP8266',
      },
    },
    // multiple axis
    scales: {
      y1: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: true,
        },
      },
    },
  };

  const [chartData, setChartData] = useState({
    labels: chartLabel,
    datasets: [
      {
        fill: false,
        label: 'Temperature',
        data: currentData.length > 0 ? currentData?.map((dataItem) => dataItem.temperature) : [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y2',
      },
      {
        fill: false,
        label: 'humidity',
        data: currentData.length > 0 ? currentData?.map((dataItem) => dataItem.humidity) : [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y2',
      },
      {
        fill: false,
        label: 'Brightness',
        data: currentData.length > 0 ? currentData?.map((dataItem) => dataItem.brightness) : [],
        borderColor: 'rgb(242, 166, 84)',
        backgroundColor: 'rgba(242, 166, 84, 0.5)',
        yAxisID: 'y1',
      },
    ],
  });

  useEffect(() => {
    const dataset = {
      labels: chartLabel,
      datasets: [
        {
          fill: false,
          label: 'Temperature',
          data: currentData.length > 0 ? currentData?.map((dataItem) => +dataItem.temperature) : [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          yAxisID: 'y2',
        },
        {
          fill: false,
          label: 'Moisture',
          data: currentData.length > 0 ? currentData?.map((dataItem) => +dataItem.humidity) : [],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          yAxisID: 'y2',
        },
        {
          fill: false,
          label: 'Brightness',
          data: currentData.length > 0 ? currentData?.map((dataItem) => +dataItem.brightness) : [],
          borderColor: 'rgb(242, 166, 84)',
          backgroundColor: 'rgba(242, 166, 84, 0.5)',
          yAxisID: 'y1',
        },
      ],
    };
    setChartData(dataset);
  }, [chartLabel, currentData]);

  // console.log('data', chartData);

  useEffect(() => {
    const slideData = localStorage.getItem('isSlideData') || false;
    setIsSlide(slideData && slideData === 'false' ? false : true);
  }, []);

  const handleChangeSlideData = useCallback(
    ({ mode }) => {
      localStorage.setItem('isSlideData', mode);
      messageApi.info(`Automatic slice data is ${mode ? 'ON' : 'OFF'}`);
      setIsSlide(mode);
    },
    [messageApi],
  );

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
    if (isSlideData && chartLabel.length > 25) {
      setChartLabel([...chartLabel.slice(chartLabel.length - 25)]);
      setCurrentData([...currentData.slice(currentData.length - 25)]);
    }
  }, [isSlideData, currentData, chartLabel]);

  return (
    <>
      {contextHolder}
      <div className={cx('wrapper', { dark })}>
        <div className={cx('slide-data-btn')}>
          <SwitchButton onClick={handleChangeSlideData} mode={isSlideData} title={'Click to slide the data in Chart'} />
        </div>
        <Line className={cx('chart')} options={options} data={chartData} />
      </div>
    </>
  );
}

export default Chart;
