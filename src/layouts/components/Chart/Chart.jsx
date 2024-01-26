import classNames from 'classnames/bind';
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
const cx = classNames.bind(styles);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Chart() {
  const labels = ['10:00:01', '10:00:02', '10:00:03', '10:00:04', '10:00:05'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature',
        data: labels.map(() => Math.ceil(Math.random() * 101)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Moisture',
        data: labels.map(() => Math.ceil(Math.random() * 101)),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Brightness',
        data: labels.map(() => Math.ceil(Math.random() * 101)),
        borderColor: 'rgb(242, 166, 84)',
        backgroundColor: 'rgba(242, 166, 84, 0.5)',
      },
    ],
  };
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

  return (
    <div className={cx('wrapper')}>
      <Line className={cx('chart')} options={options} data={data} />
    </div>
  );
}

export default Chart;
