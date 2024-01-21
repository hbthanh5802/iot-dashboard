import { useId } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './SwitchButton.module.scss';

const cx = classNames.bind(styles);

function SwitchButton({ label, className }) {
  const classes = cx('wrapper', {
    [className]: className,
  });
  const witchId = useId();
  return (
    <div className={classes}>
      <input type="checkbox" id={witchId} name="theme-switch" className={cx('theme-switch__input')} />
      <label htmlFor={witchId} className={cx('theme-switch__label')}>
        <span>{label}</span>
      </label>
    </div>
  );
}

SwitchButton.defaultProps = {
  label: 'Switch label',
};

SwitchButton.propTypes = {
  label: PropTypes.string,
};

export default SwitchButton;
