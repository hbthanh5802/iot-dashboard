import classNames from 'classnames/bind';

import styles from './SensorsHistory.module.scss';

const cx = classNames.bind(styles);

function SensorsHistory() {
  return (
    <div className={cx('wrapper')}>
      <h3>History Page</h3>
    </div>
  );
}

export default SensorsHistory;
