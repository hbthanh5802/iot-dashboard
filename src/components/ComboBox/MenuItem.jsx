import classNames from 'classnames/bind';
import styles from './ComboBox.module.scss';
const cx = classNames.bind(styles);

function MenuItem({ value, handleClickValue, handleSetInputValue }) {
  return (
    <div
      className={cx('menu-item')}
      onClick={() => {
        handleClickValue(value);
        handleSetInputValue(value);
      }}
    >
      <p>{value}</p>
    </div>
  );
}

export default MenuItem;
